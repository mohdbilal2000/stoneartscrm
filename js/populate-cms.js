/**
 * CMS Content Populator
 * Populates missing CMS content in HTML pages using complete Webflow CMS data
 * Handles all metafields: special images, colors, marketing content, relationships
 */

(function() {
  'use strict';

  // Load CMS data
  let cmsData = null;

  // Fetch CMS data
  async function loadCMSData() {
    try {
      const response = await fetch('data/mock-cms-data.json');
      cmsData = await response.json();
      return cmsData;
    } catch (error) {
      console.error('Error loading CMS data:', error);
      return null;
    }
  }

  // Get product from URL or default
  function getCurrentProduct() {
    if (!cmsData || !cmsData.products || cmsData.products.length === 0) {
      console.error('populate-cms.js: Cannot get product - cmsData is null or empty');
      return null;
    }

    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const productParam = searchParams.get('product');
    const match = path.match(/\/product\/([^\/]+)/);
    const slug = productParam || (match ? match[1] : null) || 'brush';
    
    console.log('populate-cms.js: Looking for product with slug:', slug);
    
    // Check main products first
    let product = cmsData.products.find(p => p.slug === slug || p.handle === slug || p.id === slug);
    
    // If not found, check samples
    if (!product && cmsData.samples) {
      product = cmsData.samples.find(p => p.slug === slug || p.handle === slug || p.id === slug);
      // If sample found, get parent product for full data
      if (product && product.parent_product_id) {
        const parent = cmsData.products.find(p => p.id === product.parent_product_id);
        if (parent) {
          // Merge sample data with parent data
          product = { ...parent, ...product };
        }
      }
    }
    
    if (product) {
      console.log('populate-cms.js: Found product:', product.name);
    } else {
      console.warn('populate-cms.js: Product not found, will use fallback');
    }
    
    return product || cmsData.products[0];
  }

  // Apply color scheme to elements
  function applyColorScheme(product) {
    if (!product || !product.color || !product.button_header_color) return;

    // Apply background color to product sections
    const productSections = document.querySelectorAll('[data-product-color]');
    productSections.forEach(section => {
      section.style.backgroundColor = product.color;
    });

    // Apply button/header color
    const colorElements = document.querySelectorAll('[data-product-accent-color]');
    colorElements.forEach(el => {
      el.style.color = product.button_header_color;
      el.style.borderColor = product.button_header_color;
    });

    // Apply to buttons
    const buttons = document.querySelectorAll('.button-outline-white, .button-outline-black');
    buttons.forEach(btn => {
      if (btn.closest('[data-product-section]')) {
        btn.style.borderColor = product.button_header_color;
        const text = btn.querySelector('.button-text');
        if (text) text.style.color = product.button_header_color;
      }
    });
  }

  // Reinitialize Swiper after content is added
  function reinitSwiper(container) {
    if (!container) return;
    
    // Wait a bit for DOM to update
    setTimeout(() => {
      // Check if Swiper is already initialized
      if (window.Swiper && container.swiper) {
        try {
          container.swiper.update();
          container.swiper.slideTo(0);
        } catch (e) {
          console.warn('populate-cms.js: Could not update Swiper:', e);
        }
      }
    }, 100);
  }

  // Populate product detail page
  function populateProductPage() {
    // Check if we're on a product detail page
    const productPageIndicator = document.querySelector('[bind="44360311-a628-3bd3-7fc8-c24734f06683"]');
    if (!productPageIndicator) {
      console.warn('populate-cms.js: Not a product detail page, skipping population');
      return;
    }
    
    // CRITICAL: Hide ALL empty states on product detail page FIRST
    // This ensures consistent layout regardless of data availability
    const productPageEmptyStates = document.querySelectorAll(
      '.section.product .w-dyn-empty, ' +
      '[bind="d37286f8-45ee-d5c0-5042-fa9b1e03f774"] .w-dyn-empty, ' +
      '[bind="2fb8e092-727e-f3ca-475b-8178c0fc0239"] .w-dyn-empty, ' +
      '[bind="116c2318-c33b-dcc5-4ef0-b6d435cfdf1f"] .w-dyn-empty, ' +
      '[bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae10"] .w-dyn-empty'
    );
    productPageEmptyStates.forEach(state => {
      state.style.display = 'none';
    });
    
    let product = getCurrentProduct();
    if (!product) {
      console.warn('populate-cms.js: Product not found in URL, using first available product as fallback');
      // Fallback to first product if none found
      if (cmsData && cmsData.products && cmsData.products.length > 0) {
        product = cmsData.products[0];
        console.log('populate-cms.js: Using fallback product:', product.name);
      } else {
        console.error('populate-cms.js: No products available in CMS data');
        return;
      }
    } else {
      console.log('populate-cms.js: Populating product page for:', product.name);
    }

    console.log('populate-cms.js: Product data:', {
      name: product.name,
      images: product.images?.length || 0,
      hasAccessories: cmsData.accessories?.length > 0
    });

    // Apply color scheme
    applyColorScheme(product);

    // Product variant name
    const variantNameEl = document.querySelector('[bind="44360311-a628-3bd3-7fc8-c24734f06683"]');
    if (variantNameEl) variantNameEl.textContent = product.name;

    // Price - update all price elements
    const priceEls = document.querySelectorAll('[bind="44360311-a628-3bd3-7fc8-c24734f0668a"], [data-commerce-type="variation-price"]');
    const priceText = product.price ? (product.price.includes('€') ? product.price : `€${product.price}`) + ' ' + (product.currency || 'EUR') : '€220.00 EUR';
    priceEls.forEach(el => {
      if (el.closest('.price_wrapper') || el.closest('.product_text_wrapper')) {
        el.textContent = priceText;
      }
    });

    // Variant selector label
    const variantLabelEl = document.querySelector('[bind="116c2318-c33b-dcc5-4ef0-b6d435cfdf1a"]');
    if (variantLabelEl) variantLabelEl.textContent = product.name || '';

    // Product description - update all instances
    const descriptionEls = document.querySelectorAll('.product-description-wrapper p, .product-description-text');
    descriptionEls.forEach(el => {
      if (product.description) {
        el.textContent = product.description;
      }
    });

    // Product dimensions - populate all dimension fields with English text
    const dimensionEls = document.querySelectorAll('.text-block-127');
    dimensionEls.forEach(el => {
      if (product.dimensions) {
        // Format: "Size per panel - 240 x 60 x 2.3 cm (1.44m²)"
        el.textContent = `Size per panel - ${product.dimensions}`;
      }
    });

    // Product image gallery - use structured images array
    const imageGallery = document.querySelector('[bind="2fb8e092-727e-f3ca-475b-8178c0fc0239"]');
    if (imageGallery) {
      const wrappers = imageGallery.querySelectorAll('.swiper-wrapper');
      const emptyState = imageGallery.querySelector('.w-dyn-empty');
      // ALWAYS hide empty state (already done above, but ensure)
      if (emptyState) emptyState.style.display = 'none';
      
      if (product.images && product.images.length > 0) {
        
        // Use the LAST wrapper (the empty one meant for population) or the first if only one exists
        const wrapper = wrappers.length > 1 ? wrappers[wrappers.length - 1] : wrappers[0];
        
        if (wrapper) {
          wrapper.innerHTML = '';
          // Sort images by sort_order
          const sortedImages = [...product.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          
          // Check if mainImage is already in the images array to avoid duplicates
          const mainImageInArray = sortedImages.some(img => img.url === product.mainImage);
          
          // Add main image first if available and not already in array
          if (product.mainImage && !mainImageInArray) {
            const mainSlide = document.createElement('div');
            mainSlide.className = 'swiper-slide is-swiper-product w-dyn-item';
            mainSlide.setAttribute('role', 'listitem');
            mainSlide.innerHTML = `<div class="img-hight"><img alt="${product.name}" loading="lazy" src="${product.mainImage}" class="img-swiper_img"></div>`;
            wrapper.appendChild(mainSlide);
          }
          
          // Add structured images (should be 4 images: panel, installation, stone, closeup)
          sortedImages.forEach((imgObj) => {
            if (imgObj.url) { // Only add if URL exists
              const slide = document.createElement('div');
              slide.className = 'swiper-slide is-swiper-product w-dyn-item';
              slide.setAttribute('role', 'listitem');
              slide.innerHTML = `<div class="img-hight"><img alt="${product.name} - ${imgObj.type}" loading="lazy" src="${imgObj.url}" class="img-swiper_img"></div>`;
              wrapper.appendChild(slide);
            }
          });
        }
        
        // Hide the first wrapper if it exists (the hardcoded one)
        if (wrappers.length > 1 && wrappers[0]) {
          wrappers[0].style.display = 'none';
        }
        
        console.log('populate-cms.js: Added', (product.mainImage ? 1 : 0) + sortedImages.length, 'image slides');
        
        // Reinitialize Swiper after adding images
        reinitSwiper(imageGallery);
      } else {
        console.warn('populate-cms.js: No images found for product:', product.name);
      }
    }

    // SKU/Variant selector - use selection_slider_image
    const skuSelector = document.querySelector('[bind="116c2318-c33b-dcc5-4ef0-b6d435cfdf1f"]');
    if (skuSelector) {
      const wrappers = skuSelector.querySelectorAll('.swiper-wrapper');
      const emptyState = skuSelector.querySelector('.w-dyn-empty');
      // ALWAYS hide empty state (already done above, but ensure)
      if (emptyState) emptyState.style.display = 'none';
      
      if (cmsData.products && cmsData.products.length > 0) {
        
        // Use the LAST wrapper (the empty one meant for population) or the first if only one exists
        const wrapper = wrappers.length > 1 ? wrappers[wrappers.length - 1] : wrappers[0];
        
        if (wrapper) {
          wrapper.innerHTML = '';
          // Filter to only main products (exclude samples) and sort by sorting field
          const mainProducts = cmsData.products.filter(p => 
            p.category === 'AKUROCK Akustikpaneele' && 
            !p.id.includes('-sample')
          );
          const sortedProducts = [...mainProducts].sort((a, b) => (a.sorting || 999) - (b.sorting || 999));
          
          console.log('populate-cms.js: Adding', sortedProducts.length, 'products to variant selector');
          
          sortedProducts.forEach((p) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide is-slider-selector w-dyn-item';
            slide.setAttribute('role', 'listitem');
            const isActive = p.slug === product.slug ? 'active' : '';
            const thumbImage = p.selection_slider_image || p.mainImage || '';
            slide.innerHTML = `
              <a href="detail_product.html?product=${p.slug}" class="slider-selector_link is-slider-selector w-inline-block ${isActive}">
                <div class="slider-selector_height">
                  <img loading="lazy" width="95" src="${thumbImage}" alt="${p.name || ''}" class="slider-selector_img">
                  <div class="checkmark_wrapper mobile"><img src="images/Aktive-Produkt-Selection-Kachel-Kreis-mit-Hackerl-Schwarz.svg" loading="lazy" alt="" class="checkmark_mobile"></div>
                </div>
              </a>
            `;
            wrapper.appendChild(slide);
          });
        }
        
        // Hide the first wrapper if it exists (the hardcoded one)
        if (wrappers.length > 1 && wrappers[0]) {
          wrappers[0].style.display = 'none';
        }
        
        // Reinitialize Swiper after adding variants
        reinitSwiper(skuSelector);
      } else {
        console.warn('populate-cms.js: No products found for variant selector');
      }
    }

    // Product selector slider (desktop) - bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae11"
    const productSelectorSlider = document.querySelector('[bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae10"]');
    if (productSelectorSlider) {
      const wrapper = productSelectorSlider.querySelector('[bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae11"]');
      const emptyState = productSelectorSlider.querySelector('[bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae16"]');
      
      if (emptyState) emptyState.style.display = 'none';
      
      if (wrapper && cmsData.products && cmsData.products.length > 0) {
        // Clear existing hardcoded items first
        const existingSlides = wrapper.querySelectorAll('.swiper-slide.is-slider-selector');
        existingSlides.forEach(slide => slide.remove());
        
        // Filter to only main products (exclude samples) and sort by sorting field
        const mainProducts = cmsData.products.filter(p => 
          p.category === 'AKUROCK Akustikpaneele' && 
          !p.id.includes('-sample')
        );
        const sortedProducts = [...mainProducts].sort((a, b) => (a.sorting || 999) - (b.sorting || 999));
        
        console.log('populate-cms.js: Adding', sortedProducts.length, 'products to product selector slider');
        
        // Map product slugs to their slider image URLs (matching the website)
        const sliderImageMap = {
          'yami': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672c4b2bd73d678ad4c9fab_Yami.webp',
          'yuki': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672c665321c865a6ece69a9_Yuki.webp',
          'brush': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672bbb7fc31823192fae261_Brush.webp',
          'whisper': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672b96579bfa56457a41e01_Whisper.webp',
          'gaia': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672c576c2c69c8cce1f8ac2_Gaia.webp',
          'ligia': 'https://cdn.prod.website-files.com/64ad5017cecbda3ed3e03b0f/6672c5e85eaae26e4deef821_ligia.webp'
        };
        
        sortedProducts.forEach((p, index) => {
          const isActive = p.slug === product.slug;
          // Use mapped image if available, otherwise fall back to selection_slider_image or mainImage
          const thumbImage = sliderImageMap[p.slug] || p.selection_slider_image || p.mainImage || '';
          const slide = document.createElement('div');
          slide.setAttribute('bind', '1a91082b-8f19-b175-b9ba-0deb9fa8ae12');
          slide.setAttribute('role', 'group');
          slide.className = `swiper-slide is-slider-selector w-dyn-item${isActive ? ' is-active' : ''}${index === 1 ? ' swiper-slide-next' : ''}`;
          slide.setAttribute('aria-label', `${index + 1} / ${sortedProducts.length}`);
          
          slide.innerHTML = `
            <a bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae13" aria-label="Akurock Acoustic Panels Link" href="detail_product.html?product=${p.slug}" class="slider-selector_link is-slider-selector w-inline-block${isActive ? ' w--current' : ''}"${isActive ? ' aria-current="page"' : ''}>
              <img bind="1a91082b-8f19-b175-b9ba-0deb9fa8ae15" loading="lazy" width="95" alt="" src="${thumbImage}" class="slider-selector_img">
              <div class="swiper-main-img"></div>
              <div class="checkmark_wrapper" style="display: ${isActive ? 'flex' : 'none'};">
                <img src="https://cdn.prod.website-files.com/64ad4116e38ed7d405f77d26/667512ce089e636294d56006_Aktive%20Produkt%20Selection%20Kachel%20Kreis%20mit%20Hackerl%20Schwarz.svg" loading="lazy" alt="" class="image-215">
              </div>
            </a>
          `;
          
          wrapper.appendChild(slide);
        });
        
        // Reinitialize Swiper after adding products
        reinitSwiper(productSelectorSlider);
      } else {
        console.warn('populate-cms.js: Product selector slider wrapper not found or no products available');
      }
    }

    // Accessories section - show main accessories sorted
    const accessoriesList = document.querySelector('[bind="d37286f8-45ee-d5c0-5042-fa9b1e03f774"]');
    if (accessoriesList) {
      // Find the CORRECT wrapper - there are two .w-dyn-items, use the LAST one (the empty one for population)
      const allWrappers = accessoriesList.querySelectorAll('.w-dyn-items');
      const wrapper = allWrappers.length > 1 ? allWrappers[allWrappers.length - 1] : allWrappers[0];
      const emptyState = accessoriesList.querySelector('.w-dyn-empty');
      // ALWAYS hide empty state (already done above, but ensure)
      if (emptyState) emptyState.style.display = 'none';
      
      // Hide the first hardcoded wrapper if multiple exist
      if (allWrappers.length > 1 && allWrappers[0]) {
        allWrappers[0].style.display = 'none';
      }
      
      if (cmsData.accessories && cmsData.accessories.length > 0) {
        
        if (wrapper) {
          wrapper.innerHTML = '';
          // Show main accessories: Schrauben weiß, Schrauben schwarz, Wandkleber
          const mainAccessories = cmsData.accessories.filter(a => 
            a.id === 'schrauben-weiss' || 
            a.id === 'wandschrauben-schwarz' || 
            a.id === 'wandkleber'
          ).sort((a, b) => (a.sorting || 999) - (b.sorting || 999));
          
          console.log('populate-cms.js: Found', mainAccessories.length, 'main accessories to display');
          
          if (mainAccessories.length > 0) {
            mainAccessories.forEach((accessory) => {
              const item = document.createElement('div');
              item.className = 'collection-item-7 w-dyn-item';
              item.setAttribute('role', 'listitem');
              const accessoryFormId = accessory.productId || '';
              const accessoryVariantId = accessory.variantId || '';
              const accessoryDataId = accessory.id || '';
              
              item.innerHTML = `
                <div class="content_additionals">
                  <div class="addtions_img_container"><img loading="lazy" src="${accessory.mainImage || ''}" alt="${accessory.name || ''}" class="image-214"></div>
                  <div class="description additionals">
                    <h2 class="additional_top">${accessory.name || ''}</h2>
                    <div class="text-block-92">${accessory.description || ''}</div>
                    <div class="text-block-93">${accessory.price || ''} ${accessory.currency || 'EUR'}</div>
                  </div>
                </div>
                <div class="buy-button">
                  <form class="w-commerce-commerceaddtocartform default-state" data-node-type="commerce-add-to-cart-form" data-wf-product-id="${accessoryFormId}" data-wf-variant-id="${accessoryVariantId}" data-product-id="${accessoryDataId}">
                    <div class="quanitity_buy_wrap"><input type="submit" data-node-type="commerce-add-to-cart-button" class="w-commerce-commerceaddtocartbutton addtional-products buy_button" value="Add to Cart"></div>
                  </form>
                </div>
              `;
              wrapper.appendChild(item);
            });
            console.log('populate-cms.js: Added', mainAccessories.length, 'accessory items');
          } else {
            console.warn('populate-cms.js: No main accessories found after filtering');
          }
        } else {
          console.warn('populate-cms.js: Accessories wrapper not found');
        }
      } else {
        console.warn('populate-cms.js: No accessories data found');
      }
    } else {
      console.warn('populate-cms.js: Accessories container not found');
    }

    // Apply hover images to product cards if available
    if (product.hover_image) {
      const productCards = document.querySelectorAll('[data-product-card]');
      productCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
          card.addEventListener('mouseenter', () => {
            img.src = product.hover_image;
          });
          card.addEventListener('mouseleave', () => {
            img.src = product.mainImage;
          });
        }
      });
    }

    // Populate add-to-cart forms with product/variant IDs
    const addToCartForms = document.querySelectorAll('[data-node-type="commerce-add-to-cart-form"]');
    addToCartForms.forEach(form => {
      // Set product and variant IDs for Webflow commerce
      if (product.productId) {
        form.setAttribute('data-wf-product-id', product.productId);
      }
      if (product.variantId) {
        form.setAttribute('data-wf-variant-id', product.variantId);
      }
      // Also set as data attributes for custom handling
      form.setAttribute('data-product-id', product.id || product.slug);
      form.setAttribute('data-variant-id', product.variantId || '');
    });

    // Ensure accessories section is visible
    if (accessoriesList) {
      const accessoriesSection = accessoriesList.closest('section, .section, [class*="section"]');
      if (accessoriesSection) {
        accessoriesSection.style.display = '';
      }
      // Also check parent containers
      let parent = accessoriesList.parentElement;
      let depth = 0;
      while (parent && depth < 5) {
        if (parent.style && parent.style.display === 'none') {
          parent.style.display = '';
        }
        parent = parent.parentElement;
        depth++;
      }
    }

    console.log('populate-cms.js: Product page population completed');
  }

  // Populate home page product slider
  function populateHomePageSlider() {
    const productSlider = document.querySelector('[bind="64b2a859-d0e1-7585-034c-483b3d178395"]');
    if (!productSlider || !cmsData || !cmsData.products) return;

    // Find the correct wrapper - there are two swiper-wrapper divs, use the one that's a direct child
    const wrappers = productSlider.querySelectorAll('.swiper-wrapper');
    const wrapper = wrappers.length > 1 ? wrappers[1] : wrappers[0]; // Use second wrapper if multiple exist
    const emptyState = productSlider.querySelector('.w-dyn-empty');
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Hide the first wrapper if it exists (the empty one) to prevent blank section
    if (wrappers.length > 1 && wrappers[0]) {
      wrappers[0].style.display = 'none';
    }
    
    if (wrapper) {
      // Sort products by sorting field and take first 4
      const sortedProducts = [...cmsData.products]
        .filter(p => p.category === 'AKUROCK Akustikpaneele') // Only main products, not samples
        .sort((a, b) => (a.sorting || 999) - (b.sorting || 999))
        .slice(0, 4);
      
      // Clear existing slides and create new ones dynamically
      wrapper.innerHTML = '';
      
      sortedProducts.forEach((product) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide is-slider-main w-dyn-item';
        slide.setAttribute('role', 'listitem');
        
        const mainImageUrl = product.mainImage || '';
        const hoverImageUrl = product.hover_image || product.mainImage || '';
        const description = product.description || '';
        const price = product.price || '€220.00';
        const currency = product.currency || 'EUR';
        
        slide.innerHTML = `
          <a href="detail_product.html?product=${product.slug}" class="slider-selector_link is-slider-main w-inline-block">
            <div class="slider-main_image-height is-slider-main">
              <img src="${mainImageUrl}" loading="lazy" alt="${product.name}" class="slider-main_image">
              <img src="${hoverImageUrl}" loading="lazy" style="opacity:0" alt="${product.name}" class="slider-main_image-2">
            </div>
            <div class="slider-main_text-wrapper is-slider-main">
              <div class="slider-main_text-holder is-slider-main">
                <h3 class="heading-142">${product.name}</h3>
                <h4 class="heading-144">${description}</h4>
              </div>
              <div class="slider-main_price-holder">
                <h3 data-commerce-type="variation-price" class="heading-143">${price} ${currency}</h3>
              </div>
            </div>
          </a>
        `;
        
        // Add hover effect
        const mainImg = slide.querySelector('.slider-main_image');
        const secondImg = slide.querySelector('.slider-main_image-2');
        if (mainImg && secondImg && hoverImageUrl !== mainImageUrl) {
          slide.addEventListener('mouseenter', () => {
            mainImg.style.opacity = '0';
            secondImg.style.opacity = '1';
          });
          slide.addEventListener('mouseleave', () => {
            mainImg.style.opacity = '1';
            secondImg.style.opacity = '0';
          });
        }
        
        wrapper.appendChild(slide);
      });
    }

    // Populate marketing content sections
    populateMarketingContent();
  }

  // Populate accessories page
  function populateAccessoriesPage() {
    if (!cmsData || !cmsData.accessories || cmsData.accessories.length === 0) {
      console.warn('populate-cms.js: No accessories data found');
      return;
    }

    const accessoriesList = document.querySelector('[bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d73b"]');
    if (!accessoriesList) {
      console.warn('populate-cms.js: Accessories page container not found');
      return;
    }

    const wrapper = accessoriesList.querySelector('[bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d73c"]');
    const emptyState = accessoriesList.querySelector('.w-dyn-empty');
    
    if (emptyState) emptyState.style.display = 'none';
    
    if (wrapper) {
      // Clear any existing hardcoded items
      const existingItems = wrapper.querySelectorAll('.addons-collection.w-dyn-item');
      existingItems.forEach(item => item.remove());
      
      // Get ALL accessories (not filtered) and sort by sorting field
      const sortedAccessories = [...cmsData.accessories]
        .filter(a => a.category === 'AKUROCK Zubehör') // Only show accessories, not samples
        .sort((a, b) => (a.sorting || 999) - (b.sorting || 999));
      
      console.log('populate-cms.js: Populating accessories page with', sortedAccessories.length, 'accessories');
      
      sortedAccessories.forEach((accessory) => {
        const item = document.createElement('div');
        item.className = 'addons-collection w-dyn-item';
        item.setAttribute('role', 'listitem');
        item.setAttribute('id', `w-node-_4a7dc39c-fd5a-acc7-8775-f4e5a479d73d-8bde98fd`);
        item.setAttribute('data-w-id', '4a7dc39c-fd5a-acc7-8775-f4e5a479d73d');
        
        const accessoryFormId = accessory.productId || '';
        const accessoryVariantId = accessory.variantId || '';
        
        // Format description - use description if available, otherwise use category info
        let descriptionText = accessory.description || '';
        // Map descriptions based on accessory ID
        const descriptionMap = {
          'schrauben-weiss': '50 pcs.',
          'wandschrauben-schwarz': '50 pcs.',
          'wandkleber': '470g cartridge / 1 panel',
          'kartuschenpresse': '1 pc.',
          'lattenschrauben': '50 pcs.',
          'nano-versiegelung': '250ml',
          'acoustic-felt': '60% Upcycled Pet Polyester'
        };
        
        if (!descriptionText && descriptionMap[accessory.id]) {
          descriptionText = descriptionMap[accessory.id];
        }
        
        // Translate German names to English for display
        const nameMap = {
          'Schrauben weiß': 'Screws white',
          'Schrauben schwarz': 'Screws black',
          'Wandkleber': 'Wall glue',
          'Kartuschenpresse': 'Cartridge press',
          'Lattenschrauben': 'Slatted screws',
          'Nano-Versiegelung': 'Nano-sealing',
          'Acoustic Felt': 'Acoustic Felt'
        };
        
        const displayName = nameMap[accessory.name] || accessory.name;
        
        item.innerHTML = `
          <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d73e" class="item-wrap_samples is-addons">
            <div class="top_titel-wrap is-addons">
              <div class="header-wrap_samples is-addons">
                <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d741" class="text-block-65 is-addons">${displayName}</div>
                <div class="description-wrap_samples is-addons">
                  <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d743" class="text-block-70 is-addons">${descriptionText}</div>
                </div>
                <div class="price-wrap_samples is-addons">
                  <div data-commerce-type="variation-price" bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d745" class="text-block-68 is-addons">${accessory.price || ''} ${accessory.currency || 'EUR'}</div>
                </div>
              </div>
            </div>
            <div class="bottom_addtocart-wrap is-addons">
              <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d74a" class="add-to-cart is-addons">
                <form bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d74b" template-bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d74b" position-bind-position="prepend" data-node-type="commerce-add-to-cart-form" class="w-commerce-commerceaddtocartform" data-wf-product-id="${accessoryFormId}" data-wf-variant-id="${accessoryVariantId}">
                  <a position-id="4a7dc39c-fd5a-acc7-8775-f4e5a479d756" data-node-type="commerce-buy-now-button" data-default-text="Buy now" data-subscription-text="Subscribe now" aria-busy="false" aria-haspopup="false" style="display:none" class="w-commerce-commercebuynowbutton" href="checkout.html">Buy now</a>
                  <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d757" position-id="4a7dc39c-fd5a-acc7-8775-f4e5a479d757" style="width:50px;height:50px" class="addtocart_container"><img src="images/Large-Arrow-White-Selection.svg" loading="lazy" width="36" alt="" class="image-131"><input data-loading-text="Unterwegs.." data-node-type="commerce-add-to-cart-button" class="w-commerce-commerceaddtocartbutton add-to-cart-button-2" style="display:none;-webkit-transform:translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);opacity:0" aria-haspopup="dialog" type="submit" bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d759" aria-busy="false" value="Warenkorb"></div>
                </form>
                <div bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d75a" style="display:none" class="w-commerce-commerceaddtocartoutofstock" tabindex="0">
                  <div>This product is out of stock.</div>
                </div>
                <div aria-live="assertive" bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d75d" data-node-type="commerce-add-to-cart-error" style="display:none" class="w-commerce-commerceaddtocarterror">
                  <div data-node-type="commerce-add-to-cart-error" data-w-add-to-cart-quantity-error="Product is not available in this quantity." data-w-add-to-cart-general-error="Something went wrong when adding this item to the cart." data-w-add-to-cart-mixed-cart-error="You can't purchase another product with a subscription." data-w-add-to-cart-buy-now-error="Something went wrong when trying to purchase this item." data-w-add-to-cart-checkout-disabled-error="Checkout is disabled on this site." data-w-add-to-cart-select-all-options-error="Please select an option in each set.">Product is not available in this quantity.</div>
                </div>
              </div>
            </div>
            <div class="darken-animation-layer is-addons"></div>
          </div>
        `;
        
        // Set background image on the item-wrap_samples
        const itemWrap = item.querySelector('.item-wrap_samples');
        if (itemWrap && accessory.mainImage) {
          itemWrap.style.backgroundImage = `url(${accessory.mainImage})`;
          itemWrap.style.backgroundSize = 'cover';
          itemWrap.style.backgroundPosition = 'center';
        }
        
        wrapper.appendChild(item);
      });
      
      console.log('populate-cms.js: Added', sortedAccessories.length, 'accessories to accessories page');
    } else {
      console.warn('populate-cms.js: Accessories wrapper not found');
    }
  }

  // Populate marketing content (slogans, CTAs) on homepage
  function populateMarketingContent() {
    if (!cmsData || !cmsData.products) return;

    // Update hero section slogan - use first product's marketing content or default
    const heroHeading = document.querySelector('.hero-heading-2');
    if (heroHeading) {
      // Find product with marketing content, prefer Brush (sorting: 1)
      const brushProduct = cmsData.products.find(p => p.id === 'brush');
      if (brushProduct && brushProduct.special_field_text) {
        heroHeading.textContent = brushProduct.special_field_text;
      } else {
        // Default English text if no marketing content
        heroHeading.textContent = 'More than just an acoustic panel, a symphony of stone and design.';
      }
    }

    // Update health section slogan with Yami product marketing content
    const yamiProduct = cmsData.products.find(p => p.id === 'yami');
    const healthSlogan = document.querySelector('.health-text-slogan');
    if (healthSlogan && yamiProduct && yamiProduct.special_field_slogan) {
      healthSlogan.textContent = yamiProduct.special_field_slogan;
    }

    // Update "Modern und ruhig" section with Yami product marketing content
    if (yamiProduct) {
      const yamiSection = document.querySelector('[product-link="Yami"]');
      if (yamiSection) {
        const parentSection = yamiSection.closest('section');
        if (parentSection) {
          const sloganEl = parentSection.querySelector('.slogan._2.text');
          if (sloganEl && yamiProduct.special_field_slogan) {
            sloganEl.textContent = yamiProduct.special_field_slogan;
          }
        }
      }
    }

    // Update shout-out section slogan if it exists
    const shoutOutSlogan = document.querySelector('.shout-out-container.main .slogan._2.text');
    if (shoutOutSlogan && yamiProduct && yamiProduct.special_field_slogan) {
      shoutOutSlogan.textContent = yamiProduct.special_field_slogan;
    }

    // Update product link buttons to point to correct product pages
    const productLinks = document.querySelectorAll('[product-link]');
    productLinks.forEach(link => {
      const productLink = link.getAttribute('product-link');
      if (productLink) {
        const product = cmsData.products.find(p => 
          p.name.toLowerCase() === productLink.toLowerCase() || 
          p.id.toLowerCase() === productLink.toLowerCase()
        );
        if (product && link.tagName === 'A') {
          link.href = `detail_product.html?product=${product.slug}`;
        }
      }
    });
  }

  // Initialize cart integration with add-to-cart forms
  function initCartIntegration() {
    if (!cmsData) {
      console.warn('Cart integration: CMS data not loaded yet');
      return;
    }

    // Initialize CartManager with CMS data
    if (window.CartManager) {
      window.CartManager.init(cmsData);
    }

    // Intercept all add-to-cart form submissions
    const addToCartForms = document.querySelectorAll('[data-node-type="commerce-add-to-cart-form"]');
    
    addToCartForms.forEach(form => {
      // Remove existing listeners by cloning and replacing
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      
      newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const productId = newForm.getAttribute('data-wf-product-id');
        const variantId = newForm.getAttribute('data-wf-variant-id');
        
        if (!productId || !variantId) {
          console.error('Cart integration: Missing product/variant IDs in form');
          return;
        }

        // Get quantity from input
        const quantityInput = newForm.querySelector('input[name="commerce-add-to-cart-quantity-input"]');
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

        // Add to cart
        if (window.CartManager) {
          const success = window.CartManager.addToCart(productId, variantId, quantity);
          if (success) {
            // Open cart sidebar
            setTimeout(() => {
              window.CartManager.openCart();
            }, 100);
          }
        } else {
          console.error('Cart integration: CartManager not available');
        }
      });
    });
  }

  // Initialize on DOM ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    loadCMSData().then(data => {
      if (!data) {
        console.error('Failed to load CMS data');
        return;
      }
      
      cmsData = data;
      
      // Expose CMS data globally for CartManager
      window.cmsData = cmsData;
      
      // Populate based on current page
      const pathname = window.location.pathname.toLowerCase();
      const filename = pathname.split('/').pop() || '';
      
      // Check if we're on product detail page (multiple ways to detect)
      if (filename.includes('detail_product') || 
          pathname.includes('detail_product') || 
          pathname.includes('product/') ||
          document.querySelector('[bind="44360311-a628-3bd3-7fc8-c24734f06683"]')) {
        populateProductPage();
      } else if (filename.includes('zubehoer') || pathname.includes('zubehoer') || 
                 document.querySelector('[bind="4a7dc39c-fd5a-acc7-8775-f4e5a479d73b"]')) {
        populateAccessoriesPage();
      } else if (pathname === '/' || filename === 'index.html' || filename === '' || filename.includes('index')) {
        populateHomePageSlider();
      }

      // Initialize cart integration after a short delay to ensure forms are rendered
      setTimeout(initCartIntegration, 300);
    });
  }

  // Start initialization
  init();

})();
