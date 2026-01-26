/**
 * Cart Manager
 * Manages shopping cart functionality using localStorage
 * Handles add, remove, update, and display of cart items
 */

(function() {
  'use strict';

  const CART_STORAGE_KEY = 'stonearts-cart';
  let cmsData = null;

  // Cart Manager Object
  const CartManager = {
    // Initialize cart system
    init: function(data) {
      cmsData = data;
      this.attachEventListeners();
      this.renderCart();
      this.updateCartBadge();
    },

    // Get cart from localStorage
    getCart: function() {
      try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        return cartJson ? JSON.parse(cartJson) : { items: [] };
      } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return { items: [] };
      }
    },

    // Save cart to localStorage
    saveCart: function(cart) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },

    // Get product data by productId and variantId
    getProductData: function(productId, variantId) {
      if (!cmsData) {
        console.error('Cart Manager: CMS data not loaded');
        return null;
      }

      // Search in products
      if (cmsData.products) {
        const product = cmsData.products.find(p => 
          p.productId === productId && p.variantId === variantId
        );
        if (product) return product;
      }

      // Search in accessories
      if (cmsData.accessories) {
        const accessory = cmsData.accessories.find(a => 
          a.productId === productId && a.variantId === variantId
        );
        if (accessory) return accessory;
      }

      console.warn('Cart Manager: Product not found', { productId, variantId });
      return null;
    },

    // Add item to cart or update quantity if exists
    addToCart: function(productId, variantId, quantity = 1) {
      const product = this.getProductData(productId, variantId);
      if (!product) {
        console.error('Cart Manager: Cannot add product - product data not found');
        return false;
      }

      const cart = this.getCart();
      const existingItemIndex = cart.items.findIndex(item => 
        item.productId === productId && item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        cart.items[existingItemIndex].quantity += parseInt(quantity, 10);
      } else {
        // Add new item
        const dimensions = product.dimensions || product.size || product.alt_text || '';
        const dimensionsDisplay = dimensions.replace(/\(.*?\)/g, '').trim(); // Remove area in parentheses
        const dimensionsShort = dimensionsDisplay.replace(/ x \d+\.\d+ x \d+\.\d+ cm/g, '').replace(/ x \d+ x \d+ cm/g, '').trim() || dimensionsDisplay;
        
        cart.items.push({
          productId: productId,
          variantId: variantId,
          productSlug: product.slug || product.id,
          name: product.name,
          price: product.priceValue || parseFloat(product.price.replace(/[^\d.]/g, '')) || 0,
          priceDisplay: product.price || `€${product.priceValue || 0}.00`,
          currency: product.currency || 'EUR',
          image: product.mainImage || (product.images && product.images[0] && product.images[0].url) || '',
          dimensions: dimensionsShort,
          quantity: parseInt(quantity, 10)
        });
      }

      this.saveCart(cart);
      this.renderCart();
      this.updateCartBadge();
      return true;
    },

    // Remove item from cart
    removeFromCart: function(productId, variantId) {
      const cart = this.getCart();
      cart.items = cart.items.filter(item => 
        !(item.productId === productId && item.variantId === variantId)
      );
      this.saveCart(cart);
      this.renderCart();
      this.updateCartBadge();
    },

    // Update item quantity
    updateQuantity: function(productId, variantId, quantity) {
      const cart = this.getCart();
      const item = cart.items.find(item => 
        item.productId === productId && item.variantId === variantId
      );

      if (item) {
        const newQuantity = parseInt(quantity, 10);
        if (newQuantity < 1) {
          this.removeFromCart(productId, variantId);
        } else {
          item.quantity = newQuantity;
          this.saveCart(cart);
          this.renderCart();
          this.updateCartBadge();
        }
      }
    },

    // Get total item count in cart
    getCartCount: function() {
      const cart = this.getCart();
      return cart.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Get total price
    getCartTotal: function() {
      const cart = this.getCart();
      const total = cart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      return total;
    },

    // Format price
    formatPrice: function(price, currency = 'EUR') {
      return `€${price.toFixed(2)} ${currency}`;
    },

    // Render cart items in sidebar
    renderCart: function() {
      const cart = this.getCart();
      const cartList = document.querySelector('[bind="4bc36725-f958-4612-d2cb-e90fd749bb31"]');
      const cartListAlt = document.querySelector('[bind="4bc36725-f958-4612-d2cb-e90fd749bb6e"]');
      const cartForm = document.querySelector('[data-node-type="commerce-cart-form"]');
      const emptyState = document.querySelector('[bind="4bc36725-f958-4612-d2cb-e90fd749bb50"]');
      const totalElement = document.querySelector('[bind="4bc36725-f958-4612-d2cb-e90fd749bb45"]');
      const totalElementAlt = document.querySelector('[bind="4bc36725-f958-4612-d2cb-e90fd749bb82"]');

      // Use whichever cart list exists
      const targetCartList = cartList || cartListAlt;
      const targetTotalElement = totalElement || totalElementAlt;

      if (!targetCartList) {
        console.warn('Cart Manager: Cart list container not found');
        return;
      }

      // Show/hide empty state
      if (emptyState) {
        if (cart.items.length === 0) {
          emptyState.style.display = 'block';
          if (cartForm) cartForm.style.display = 'none';
        } else {
          emptyState.style.display = 'none';
          if (cartForm) cartForm.style.display = 'block';
        }
      }

      // Clear existing items
      targetCartList.innerHTML = '';

      // Render cart items
      cart.items.forEach((item, index) => {
        const cartItem = this.createCartItemHTML(item);
        targetCartList.appendChild(cartItem);
      });

      // Update total
      if (targetTotalElement) {
        const total = this.getCartTotal();
        targetTotalElement.textContent = this.formatPrice(total);
      }
    },

    // Create cart item HTML element
    createCartItemHTML: function(item) {
      const div = document.createElement('div');
      div.className = 'w-commerce-commercecartitem';
      div.setAttribute('data-product-id', item.productId);
      div.setAttribute('data-variant-id', item.variantId);

      // Format dimensions for display (e.g., "240×60 cm")
      const dimensionsDisplay = item.dimensions.replace(/ x /g, '×').replace(/cm/g, 'cm').trim();

      div.innerHTML = `
        <img src="${item.image || ''}" alt="${item.name || ''}" class="w-commerce-commercecartitemimage">
        <div class="w-commerce-commercecartiteminfo">
          <div class="w-commerce-commercecartproductname">${item.name || ''}</div>
          ${item.dimensions ? `<div class="w-commerce-commercecartproductoption">${dimensionsDisplay}</div>` : ''}
          <div class="w-commerce-commercecartproductprice">${item.priceDisplay} ${item.currency}</div>
          <div class="cart-quantity-controls">
            <button type="button" class="q-dec cart-qty-btn" data-action="decrease" data-product-id="${item.productId}" data-variant-id="${item.variantId}">
              <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" style="width: 16px; height: 16px;">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 13H5v-2h14v2z" fill="currentColor"></path>
              </svg>
            </button>
            <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-product-id="${item.productId}" data-variant-id="${item.variantId}">
            <button type="button" class="q-inc cart-qty-btn" data-action="increase" data-product-id="${item.productId}" data-variant-id="${item.variantId}">
              <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" style="width: 16px; height: 16px;">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
          <a href="#" class="cart-delete-link" data-action="delete" data-product-id="${item.productId}" data-variant-id="${item.variantId}">Delete</a>
        </div>
      `;

      return div;
    },

    // Update cart badge count
    updateCartBadge: function() {
      const count = this.getCartCount();
      const badges = document.querySelectorAll('[bind="4bc36725-f958-4612-d2cb-e90fd749bb26"], [bind="4bc36725-f958-4612-d2cb-e90fd749bb63"]');
      badges.forEach(badge => {
        badge.textContent = count;
      });
    },

    // Open cart sidebar
    openCart: function() {
      const cartWrapper = document.querySelector('[data-node-type="commerce-cart-wrapper"]');
      const cartContainer = document.querySelector('[data-node-type="commerce-cart-container-wrapper"]');
      if (cartContainer) {
        cartContainer.style.display = 'block';
        // Trigger Webflow cart open event if needed
        const openLink = document.querySelector('[data-node-type="commerce-cart-open-link"]');
        if (openLink) {
          openLink.click();
        }
      }
    },

    // Attach event listeners for cart interactions
    attachEventListeners: function() {
      const self = this;

      // Delegate events for dynamically created elements
      document.addEventListener('click', function(e) {
        const action = e.target.closest('[data-action]');
        if (!action) return;

        const productId = action.getAttribute('data-product-id');
        const variantId = action.getAttribute('data-variant-id');
        const actionType = action.getAttribute('data-action');

        if (actionType === 'decrease') {
          e.preventDefault();
          const cart = self.getCart();
          const item = cart.items.find(item => 
            item.productId === productId && item.variantId === variantId
          );
          if (item && item.quantity > 1) {
            self.updateQuantity(productId, variantId, item.quantity - 1);
          } else if (item) {
            self.removeFromCart(productId, variantId);
          }
        } else if (actionType === 'increase') {
          e.preventDefault();
          const cart = self.getCart();
          const item = cart.items.find(item => 
            item.productId === productId && item.variantId === variantId
          );
          if (item) {
            self.updateQuantity(productId, variantId, item.quantity + 1);
          }
        } else if (actionType === 'delete') {
          e.preventDefault();
          self.removeFromCart(productId, variantId);
        }
      });

      // Handle quantity input changes
      document.addEventListener('change', function(e) {
        if (e.target.classList.contains('cart-quantity-input')) {
          const productId = e.target.getAttribute('data-product-id');
          const variantId = e.target.getAttribute('data-variant-id');
          const quantity = e.target.value;
          self.updateQuantity(productId, variantId, quantity);
        }
      });

      // Handle cart open/close (if Webflow handlers don't work)
      const cartOpenLinks = document.querySelectorAll('[data-node-type="commerce-cart-open-link"]');
      cartOpenLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          self.renderCart();
        });
      });
    }
  };

  // Expose CartManager globally
  window.CartManager = CartManager;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Wait for CMS data to be loaded
      if (window.cmsData) {
        CartManager.init(window.cmsData);
      } else {
        // Try to get CMS data from populate-cms.js
        setTimeout(function() {
          if (window.cmsData) {
            CartManager.init(window.cmsData);
          }
        }, 500);
      }
    });
  } else {
    if (window.cmsData) {
      CartManager.init(window.cmsData);
    }
  }

})();
