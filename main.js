// Main JavaScript file

// DOM Elements
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenuClose = document.querySelector(".mobile-menu-close")
const mobileMenu = document.querySelector(".mobile-menu")
const toastContainer = document.getElementById("toast-container")
const currentYearElements = document.querySelectorAll("#current-year")

// Initialize mobile menu
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  })
}

if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })
}

// Set current year in footer
if (currentYearElements) {
  const currentYear = new Date().getFullYear()
  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })
}

// Toast notification function
function showToast(type, title, message, duration = 3000) {
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`

  let icon = ""
  switch (type) {
    case "success":
      icon = '<i class="fa-solid fa-circle-check toast-icon"></i>'
      break
    case "error":
      icon = '<i class="fa-solid fa-circle-xmark toast-icon"></i>'
      break
    case "warning":
      icon = '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>'
      break
    case "info":
      icon = '<i class="fa-solid fa-circle-info toast-icon"></i>'
      break
  }

  toast.innerHTML = `
        ${icon}
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `

  toastContainer.appendChild(toast)

  // Add close event
  const closeBtn = toast.querySelector(".toast-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.remove()
    })
  }

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toast.remove()
    }
  }, duration)
}

// Initialize featured products on homepage
function initFeaturedProducts() {
  const featuredProductsContainer = document.getElementById("featured-products")
  if (!featuredProductsContainer) return

  // Get first 4 products
  const featuredProducts = products.slice(0, 4)

  // Create HTML
  let productsHtml = ""
  featuredProducts.forEach((product) => {
    productsHtml += createProductCard(product)
  })

  featuredProductsContainer.innerHTML = productsHtml

  // Initialize product interactions
  initProductFavorites()
  initAddToCartButtons()
}

// Initialize products page
function initProductsPage() {
  const productsGrid = document.getElementById("products-grid")
  const noProductsMessage = document.getElementById("no-products")
  if (!productsGrid || !noProductsMessage) return

  // Get filter elements
  const categoryRadios = document.querySelectorAll('input[name="category"]')
  const mobileCategoryRadios = document.querySelectorAll('input[name="mobile-category"]')
  const priceMinInput = document.getElementById("price-min")
  const priceMaxInput = document.getElementById("price-max")
  const mobilePriceMinInput = document.getElementById("mobile-price-min")
  const mobilePriceMaxInput = document.getElementById("mobile-price-max")
  const priceMinValue = document.getElementById("price-min-value")
  const priceMaxValue = document.getElementById("price-max-value")
  const mobilePriceMinValue = document.getElementById("mobile-price-min-value")
  const mobilePriceMaxValue = document.getElementById("mobile-price-max-value")
  const sortSelect = document.getElementById("sort-select")
  const searchInput = document.getElementById("search-input")

  // Mobile filters
  const mobileFilterBtn = document.getElementById("mobile-filter-btn")
  const mobileFiltersOverlay = document.getElementById("mobile-filters-overlay")
  const mobileFiltersClose = document.querySelector(".mobile-filters-close")
  const resetFiltersBtn = document.getElementById("reset-filters-btn")
  const applyFiltersBtn = document.getElementById("apply-filters-btn")

  // Filter state
  const filterOptions = {
    category: "all",
    search: "",
    minPrice: 0,
    maxPrice: 1000000,
    sortBy: "featured",
  }

  // Function to update products display
  function updateProducts() {
    const filteredProducts = filterProducts(filterOptions)

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = ""
      noProductsMessage.style.display = "block"
    } else {
      let productsHtml = ""
      filteredProducts.forEach((product) => {
        productsHtml += createProductCard(product)
      })

      productsGrid.innerHTML = productsHtml
      noProductsMessage.style.display = "none"

      // Initialize product interactions
      initProductFavorites()
      initAddToCartButtons()
    }
  }

  // Initialize price range sliders
  if (priceMinInput && priceMaxInput && priceMinValue && priceMaxValue) {
    priceMinInput.addEventListener("input", () => {
      const minVal = Number.parseInt(priceMinInput.value)
      const maxVal = Number.parseInt(priceMaxInput.value)

      if (minVal > maxVal) {
        priceMinInput.value = maxVal
      }

      priceMinValue.textContent = Number.parseInt(priceMinInput.value).toLocaleString() + "₫"
      filterOptions.minPrice = Number.parseInt(priceMinInput.value)
      updateProducts()
    })

    priceMaxInput.addEventListener("input", () => {
      const minVal = Number.parseInt(priceMinInput.value)
      const maxVal = Number.parseInt(priceMaxInput.value)

      if (maxVal < minVal) {
        priceMaxInput.value = minVal
      }

      priceMaxValue.textContent = Number.parseInt(priceMaxInput.value).toLocaleString() + "₫"
      filterOptions.maxPrice = Number.parseInt(priceMaxInput.value)
      updateProducts()
    })
  }

  // Mobile price range sliders
  if (mobilePriceMinInput && mobilePriceMaxInput && mobilePriceMinValue && mobilePriceMaxValue) {
    mobilePriceMinInput.addEventListener("input", () => {
      const minVal = Number.parseInt(mobilePriceMinInput.value)
      const maxVal = Number.parseInt(mobilePriceMaxInput.value)

      if (minVal > maxVal) {
        mobilePriceMinInput.value = maxVal
      }

      mobilePriceMinValue.textContent = Number.parseInt(mobilePriceMinInput.value).toLocaleString() + "₫"
    })

    mobilePriceMaxInput.addEventListener("input", () => {
      const minVal = Number.parseInt(mobilePriceMinInput.value)
      const maxVal = Number.parseInt(mobilePriceMaxInput.value)

      if (maxVal < minVal) {
        mobilePriceMaxInput.value = minVal
      }

      mobilePriceMaxValue.textContent = Number.parseInt(mobilePriceMaxInput.value).toLocaleString() + "₫"
    })
  }

  // Category filter
  if (categoryRadios) {
    categoryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        filterOptions.category = radio.value
        updateProducts()
      })
    })
  }

  // Sort filter
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      filterOptions.sortBy = sortSelect.value
      updateProducts()
    })
  }

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterOptions.search = searchInput.value
      updateProducts()
    })
  }

  // Mobile filters
  if (mobileFilterBtn && mobileFiltersOverlay) {
    mobileFilterBtn.addEventListener("click", () => {
      mobileFiltersOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (mobileFiltersClose && mobileFiltersOverlay) {
    mobileFiltersClose.addEventListener("click", () => {
      mobileFiltersOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  if (mobileCategoryRadios) {
    mobileCategoryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Sync with desktop radios
        document.querySelector(`input[name="category"][value="${radio.value}"]`).checked = true
      })
    })
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      // Reset mobile filters
      document.querySelector('input[name="mobile-category"][value="all"]').checked = true
      mobilePriceMinInput.value = 0
      mobilePriceMaxInput.value = 1000000
      mobilePriceMinValue.textContent = "0₫"
      mobilePriceMaxValue.textContent = "1.000.000₫"
    })
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      // Apply mobile filters to main filters
      const selectedCategory = document.querySelector('input[name="mobile-category"]:checked').value
      const minPrice = Number.parseInt(mobilePriceMinInput.value)
      const maxPrice = Number.parseInt(mobilePriceMaxInput.value)

      // Update desktop UI
      document.querySelector(`input[name="category"][value="${selectedCategory}"]`).checked = true
      priceMinInput.value = minPrice
      priceMaxInput.value = maxPrice
      priceMinValue.textContent = minPrice.toLocaleString() + "₫"
      priceMaxValue.textContent = maxPrice.toLocaleString() + "₫"

      // Update filter options
      filterOptions.category = selectedCategory
      filterOptions.minPrice = minPrice
      filterOptions.maxPrice = maxPrice

      // Update products
      updateProducts()

      // Close mobile filters
      mobileFiltersOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Initial load
  updateProducts()
}

// Initialize product detail page
function initProductDetailPage() {
  const productDetailContainer = document.getElementById("product-detail")
  const relatedProductsContainer = document.getElementById("related-products")
  const productNameTab = document.getElementById("product-name-tab")

  if (!productDetailContainer) return

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (!productId) {
    window.location.href = "products.html"
    return
  }

  // Get product
  const product = getProductById(productId)
  if (!product) {
    window.location.href = "products.html"
    return
  }

  // Update page title
  document.title = `${product.name} - Hoa Sáp Thơm`

  // Create product images array (main + 3 additional)
  const productImages = [
    product.image,
    product.image.replace(".jpg", "-2.jpg"),
    product.image.replace(".jpg", "-3.jpg"),
    product.image.replace(".jpg", "-4.jpg"),
    product.image.replace(".jpg", "-4.jpg"),
  ]

  // Create product detail HTML
  const productDetailHtml = `
    <div class="product-gallery">
      <div class="main-image">
        <img src="${productImages[0]}" alt="${product.name}" id="main-product-image" onerror="this.src='images/placeholder.jpg'">
      </div>
      <div class="thumbnail-images">
        ${productImages
          .map(
            (image, index) => `
          <div class="thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
            <img src="${image}" alt="${product.name} - Ảnh ${index + 1}" onerror="this.src='images/placeholder.jpg'">
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <div class="product-rating">
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <span>(12 đánh giá)</span>
      </div>
      <p class="product-price">${product.price}</p>
      <p class="product-description">${product.description}</p>
      <div class="quantity-selector">
        <button class="quantity-btn" id="decrease-quantity" disabled>
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="quantity-value" id="quantity-value">1</span>
        <button class="quantity-btn" id="increase-quantity">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="product-actions">
        <button class="btn btn-primary" id="add-to-cart-btn">
          <i class="fa-solid fa-cart-shopping"></i>
          Thêm vào giỏ hàng
        </button>
        <button class="btn btn-outline" id="add-to-favorites-btn">
          <i class="fa-regular fa-heart"></i>
          Thêm vào yêu thích
        </button>
        <button class="btn btn-outline" id="share-btn">
          <i class="fa-solid fa-share"></i>
        </button>
      </div>
      <div class="product-meta">
        <div class="product-meta-grid">
          <div class="product-meta-item">
            <p>Tình trạng:</p>
            <p>Còn hàng</p>
          </div>
          <div class="product-meta-item">
            <p>Danh mục:</p>
            <p>${categories.find((c) => c.value === product.category)?.label || product.category}</p>
          </div>
          <div class="product-meta-item">
            <p>Vận chuyển:</p>
            <p>1-3 ngày</p>
          </div>
          <div class="product-meta-item">
            <p>Mã sản phẩm:</p>
            <p>${product.id}</p>
          </div>
        </div>
      </div>
    </div>
  `

  productDetailContainer.innerHTML = productDetailHtml

  // Update product name in description tab
  if (productNameTab) {
    productNameTab.textContent = product.name
  }

  // Get related products
  const relatedProducts = getRelatedProducts(product)

  // Create related products HTML
  if (relatedProductsContainer && relatedProducts.length > 0) {
    let relatedProductsHtml = ""
    relatedProducts.forEach((relatedProduct) => {
      relatedProductsHtml += createProductCard(relatedProduct)
    })
    relatedProductsContainer.innerHTML = relatedProductsHtml

    // Initialize product interactions for related products
    initProductFavorites()
    initAddToCartButtons()
  }

  // Thumbnail click event
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("main-product-image")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked thumbnail
      thumbnail.classList.add("active")

      // Update main image
      const index = thumbnail.dataset.index
      mainImage.src = productImages[index]
    })
  })

  // Quantity selector
  const decreaseBtn = document.getElementById("decrease-quantity")
  const increaseBtn = document.getElementById("increase-quantity")
  const quantityValue = document.getElementById("quantity-value")
  let quantity = 1

  if (decreaseBtn && increaseBtn && quantityValue) {
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--
        quantityValue.textContent = quantity
        decreaseBtn.disabled = quantity === 1
        increaseBtn.disabled = false
      }
    })

    increaseBtn.addEventListener("click", () => {
      if (quantity < 10) {
        quantity++
        quantityValue.textContent = quantity
        decreaseBtn.disabled = false
        increaseBtn.disabled = quantity === 10
      }
    })
  }

  // Add to cart button
  const addToCartBtn = document.getElementById("add-to-cart-btn")
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      addToCart(product, quantity)
      showToast("success", "Đã thêm vào giỏ hàng", `${product.name} đã được thêm vào giỏ hàng của bạn.`)
    })
  }

  // Add to favorites button
  const addToFavoritesBtn = document.getElementById("add-to-favorites-btn")
  if (addToFavoritesBtn) {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
    const isFavorite = favorites.includes(product.id)

    // Update initial state
    if (isFavorite) {
      addToFavoritesBtn.querySelector("i").classList.remove("fa-regular")
      addToFavoritesBtn.querySelector("i").classList.add("fa-solid")
    }

    addToFavoritesBtn.addEventListener("click", () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || []
      const isFavorite = favorites.includes(product.id)

      if (isFavorite) {
        // Remove from favorites
        const index = favorites.indexOf(product.id)
        if (index !== -1) {
          favorites.splice(index, 1)
        }
        addToFavoritesBtn.querySelector("i").classList.remove("fa-solid")
        addToFavoritesBtn.querySelector("i").classList.add("fa-regular")
        showToast(
          "success",
          "Đã xóa khỏi danh sách yêu thích",
          `${product.name} đã được xóa khỏi danh sách yêu thích của bạn.`,
        )
      } else {
        // Add to favorites
        favorites.push(product.id)
        addToFavoritesBtn.querySelector("i").classList.remove("fa-regular")
        addToFavoritesBtn.querySelector("i").classList.add("fa-solid")
        showToast(
          "success",
          "Đã thêm vào danh sách yêu thích",
          `${product.name} đã được thêm vào danh sách yêu thích của bạn.`,
        )
      }

      localStorage.setItem("favorites", JSON.stringify(favorites))
    })
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const tabId = button.dataset.tab
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Initialize newsletter form
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form")
  if (!newsletterForm) return

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailInput = newsletterForm.querySelector("input[type='email']")
    const email = emailInput.value

    if (email) {
      showToast("success", "Đăng ký thành công", "Cảm ơn bạn đã đăng ký nhận bản tin từ Hoa Sáp Thơm")
      emailInput.value = ""
    } else {
      showToast("error", "Lỗi", "Vui lòng nhập địa chỉ email của bạn")
    }
  })
}

// Document ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize featured products on homepage
  initFeaturedProducts()

  // Initialize products page
  initProductsPage()

  // Initialize product detail page
  initProductDetailPage()

  // Initialize newsletter form
  initNewsletterForm()
})
