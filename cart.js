// Cart functionality
let cart = []

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart)
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
      cart = []
    }
  }
  updateCartCount()
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

// Update cart count in the header
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count")
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  cartCountElements.forEach((element) => {
    element.textContent = count
  })
}

// Add product to cart
function addToCart(product, quantity = 1) {
  const existingItemIndex = cart.findIndex((item) => item.id === product.id)

  if (existingItemIndex !== -1) {
    // Product already in cart, update quantity
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new product to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: quantity,
    })
  }

  saveCart()
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  saveCart()
}

// Update product quantity in cart
function updateCartItemQuantity(productId, quantity) {
  const itemIndex = cart.findIndex((item) => item.id === productId)

  if (itemIndex !== -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity
    } else {
      // If quantity is 0 or negative, remove item
      cart.splice(itemIndex, 1)
    }

    saveCart()
  }
}

// Clear cart
function clearCart() {
  cart = []
  saveCart()
}

// Calculate cart subtotal
function calculateSubtotal() {
  return cart.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity
  }, 0)
}

// Calculate shipping cost
function calculateShipping() {
  const subtotal = calculateSubtotal()
  return subtotal > 0 ? 30000 : 0 // Free shipping for orders over a certain amount could be implemented here
}

// Calculate total
function calculateTotal() {
  return calculateSubtotal() + calculateShipping()
}

// Parse price from string (e.g., "350.000₫" to 350000)
function parsePrice(priceString) {
  return Number.parseInt(priceString.replace(/\D/g, ""))
}

// Format price to string (e.g., 350000 to "350.000₫")
function formatPrice(price) {
  return price.toLocaleString() + "₫"
}

// Initialize cart page
function initCartPage() {
  const cartContentElement = document.getElementById("cart-content")
  const emptyCartElement = document.getElementById("empty-cart")

  if (!cartContentElement || !emptyCartElement) return

  if (cart.length === 0) {
    cartContentElement.style.display = "none"
    emptyCartElement.style.display = "block"
    return
  }

  cartContentElement.style.display = "grid"
  emptyCartElement.style.display = "none"

  // Create cart HTML
  let cartItemsHtml = ""

  cart.forEach((item) => {
    cartItemsHtml += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="cart-item-details">
                    <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
                    <p>${item.description}</p>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-quantity" data-id="${item.id}">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-quantity" data-id="${item.id}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `
  })

  const subtotal = calculateSubtotal()
  const shipping = calculateShipping()
  const total = calculateTotal()

  cartContentElement.innerHTML = `
        <div class="cart-items">
            ${cartItemsHtml}
            <div class="cart-footer">
                <button class="btn btn-outline" id="clear-cart-btn">Xóa giỏ hàng</button>
            </div>
        </div>
        <div class="cart-summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div class="summary-row">
                <span>Tạm tính</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Phí vận chuyển</span>
                <span>${formatPrice(shipping)}</span>
            </div>
            <div class="coupon-form">
                <input type="text" placeholder="Mã giảm giá" id="coupon-code">
                <button class="btn btn-outline" id="apply-coupon-btn">Áp dụng</button>
            </div>
            <div class="coupon-applied" id="coupon-applied" style="display: none;">
                Đã áp dụng mã giảm giá GIAMGIA10 (-10%)
            </div>
            <div class="summary-row total">
                <span>Tổng cộng</span>
                <span id="cart-total">${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary btn-block">Tiến hành thanh toán</a>
        </div>
    `

  // Add event listeners
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      const currentItem = cart.find((item) => item.id === productId)

      if (currentItem && currentItem.quantity > 1) {
        updateCartItemQuantity(productId, currentItem.quantity - 1)
        initCartPage() // Refresh the cart page
      }
    })
  })

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      const currentItem = cart.find((item) => item.id === productId)

      if (currentItem && currentItem.quantity < 10) {
        updateCartItemQuantity(productId, currentItem.quantity + 1)
        initCartPage() // Refresh the cart page
      }
    })
  })

  document.querySelectorAll(".cart-item-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id
      const product = cart.find((item) => item.id === productId)

      if (product) {
        removeFromCart(productId)
        showToast("info", "Đã xóa sản phẩm", `${product.name} đã được xóa khỏi giỏ hàng của bạn.`)
        initCartPage() // Refresh the cart page
      }
    })
  })

  const clearCartBtn = document.getElementById("clear-cart-btn")
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
        clearCart()
        showToast("info", "Đã xóa giỏ hàng", "Tất cả sản phẩm đã được xóa khỏi giỏ hàng của bạn.")
        initCartPage() // Refresh the cart page
      }
    })
  }

  const applyCouponBtn = document.getElementById("apply-coupon-btn")
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", () => {
      const couponCode = document.getElementById("coupon-code").value

      if (couponCode.toUpperCase() === "GIAMGIA10") {
        const couponApplied = document.getElementById("coupon-applied")
        couponApplied.style.display = "block"

        // Apply 10% discount
        const discount = Math.round(subtotal * 0.1)
        const newTotal = total - discount

        // Update total display
        document.getElementById("cart-total").textContent = formatPrice(newTotal)

        showToast("success", "Mã giảm giá hợp lệ", "Đã áp dụng mã giảm giá GIAMGIA10 (-10%).")
      } else {
        showToast("error", "Mã giảm giá không hợp lệ", "Vui lòng kiểm tra lại mã giảm giá của bạn.")
      }
    })
  }
}

// Initialize checkout page
function initCheckoutPage() {
  const orderItemsElement = document.getElementById("order-items")
  const subtotalElement = document.getElementById("subtotal")
  const shippingElement = document.getElementById("shipping")
  const totalElement = document.getElementById("total")

  if (!orderItemsElement || !subtotalElement || !shippingElement || !totalElement) return

  // Check if cart is empty
  if (cart.length === 0) {
    window.location.href = "cart.html"
    return
  }

  // Create order items HTML
  let orderItemsHtml = ""

  cart.forEach((item) => {
    const itemTotal = parsePrice(item.price) * item.quantity

    orderItemsHtml += `
            <div class="order-item">
                <div class="order-item-name">
                    ${item.name} <span class="order-item-quantity">x${item.quantity}</span>
                </div>
                <div>${formatPrice(itemTotal)}</div>
            </div>
        `
  })

  orderItemsElement.innerHTML = orderItemsHtml

  // Update totals
  const subtotal = calculateSubtotal()
  const shipping = calculateShipping()
  const total = calculateTotal()

  subtotalElement.textContent = formatPrice(subtotal)
  shippingElement.textContent = formatPrice(shipping)
  totalElement.textContent = formatPrice(total)

  // Payment method toggle
  const paymentRadios = document.querySelectorAll('input[name="payment"]')
  const bankInfo = document.getElementById("bank-info")
  const cardInfo = document.getElementById("card-info")

  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "bank") {
        bankInfo.style.display = "block"
        cardInfo.style.display = "none"
      } else if (radio.value === "card") {
        bankInfo.style.display = "none"
        cardInfo.style.display = "block"
      } else {
        bankInfo.style.display = "none"
        cardInfo.style.display = "none"
      }
    })
  })

  // Form submission
  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      const fullName = document.getElementById("fullName").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const address = document.getElementById("address").value
      const city = document.getElementById("city").value

      if (!fullName || !email || !phone || !address || !city) {
        showToast("error", "Thiếu thông tin", "Vui lòng điền đầy đủ thông tin thanh toán.")
        return
      }

      // Process order
      const orderNumber = "HS" + Math.floor(100000 + Math.random() * 900000)

      // Save order to localStorage
      const order = {
        orderNumber,
        date: new Date().toISOString(),
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
        },
        items: cart,
        totals: {
          subtotal,
          shipping,
          total,
        },
        status: "confirmed",
      }

      const orders = JSON.parse(localStorage.getItem("orders")) || []
      orders.push(order)
      localStorage.setItem("orders", JSON.stringify(orders))

      // Clear cart
      clearCart()

      // Redirect to success page
      window.location.href = "order-success.html?order=" + orderNumber
    })
  }
}

// Load cart on page load
document.addEventListener("DOMContentLoaded", () => {
  loadCart()

  // Initialize cart page if on cart page
  if (window.location.pathname.includes("cart.html")) {
    initCartPage()
  }

  // Initialize checkout page if on checkout page
  if (window.location.pathname.includes("checkout.html")) {
    initCheckoutPage()
  }
})

// Mock showToast function for demonstration purposes.
// In a real application, this would be replaced with a proper implementation.
function showToast(type, title, message) {
  console.log(`Toast: ${type} - ${title} - ${message}`)
  // You would typically use a library like Toastify or SweetAlert here
  // to display a visual toast notification.
}
