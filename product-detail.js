// Product Detail Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
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
  
    // Update product name in description tab
    const productNameTab = document.getElementById("product-name-tab")
    if (productNameTab) {
      productNameTab.textContent = product.name
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
  })
  