// Checkout Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
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
            subtotal: calculateSubtotal(),
            shipping: calculateShipping(),
            total: calculateTotal(),
          },
          status: "confirmed",
        }
  
        const orders = JSON.parse(localStorage.getItem("orders")) || []
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
  
        // Clear cart
        clearCart()
  
        // Show success message
        showToast("success", "Đặt hàng thành công", "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.")
  
        // Redirect to success page
        setTimeout(() => {
          window.location.href = "order-success.html?order=" + orderNumber
        }, 1500)
      })
    }
  })
  