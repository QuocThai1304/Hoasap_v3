// Products data
const products = [
    {
      id: "hoa-hong-do",
      name: "Hoa Hồng Sáp Thơm",
      price: "350.000₫",
      image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/487/411/products/4fbabb86-9ff3-4abf-9671-3a9c449928dc.jpg?v=1731985247717",
      description: "Bó hoa hồng sáp thơm 20 bông, màu đỏ rực rỡ",
      category: "hoa-hong",
    },
    {
      id: "hoa-tulip-vang",
      name: "Hoa Tulip Sáp Thơm",
      price: "420.000₫",
      image: "https://thanhcongflowers.com/wp-content/uploads/2023/11/1fa2deaefee128bf71f0.jpg",
      description: "Bó hoa tulip sáp 15 bông, màu vàng tươi sáng",
      category: "hoa-tulip",
    },
    {
      id: "hoa-cam-tu-cau-xanh",
      name: "Hoa Cẩm Tú Cầu",
      price: "380.000₫",
      image: "https://i0.wp.com/tiemhoabonmua.com/wp-content/uploads/2023/06/cam-tu-cau-hong-1.jpg?ssl=1",
      description: "Bó hoa cẩm tú cầu sáp thơm, màu xanh pastel",
      category: "hoa-cam-tu-cau",
    },
    {
      id: "hoa-lily-trang",
      name: "Hoa hướng dương",
      price: "450.000₫",
      image: "https://xinhflower.com/wp-content/uploads/2024/11/bo-hoa-sap-huong-duong-tot-nghiep-1.jpg",
      description: "Bó hoa lily sáp thơm 10 bông, màu sắc đẹp",
      category: "hoa-lily",
    },
    {
      id: "hoa-hong-hong",
      name: "Hoa Hồng Sáp Hồng",
      price: "350.000₫",
      image: "https://birthdaylovecake.com/wp-content/uploads/2022/04/Bo-hoa-sap-dep.jpg",
      description: "Bó hoa hồng sáp thơm 20 bông",
      category: "hoa-hong",
    },
    {
      id: "hoa-tulip-do",
      name: "Hoa Tulip Thơm Sáp Đỏ",
      price: "420.000₫",
      image: "https://flowersight.com/wp-content/uploads/2024/07/bo-hoa-tulip-do-2.jpg",
      description: "Bó hoa tulip sáp 15 bông, màu đỏ rực rỡ",
      category: "hoa-tulip",
    },
    {
      id: "hoa-cam-tu-cau-tim",
      name: "Hoa Cẩm Tú Cầu Tím",
      price: "380.000₫",
      image: "https://flowersight.com/wp-content/uploads/2023/11/bo-hoa-cam-tu-cau-xanh-duong-ket-hop-nhieu-loai-hoa-khac.jpg",
      description: "Bó hoa cẩm tú cầu sáp thơm, màu tím lavender",
      category: "hoa-cam-tu-cau",
    },
    {
      id: "hoa-lily-hong",
      name: "Hoa Lily Thơm Sáp Hồng",
      price: "450.000₫",
      image: "https://hoatuoidatviet.vn/thumb/600x667/1/upload/sanpham/gio-hoa-ly-kep-hong-sang-trong-3370.jpg",
      description: "Bó hoa lily sáp thơm 10 bông, màu hồng nhạt",
      category: "hoa-lily",
    },
    {
      id: "bo-hoa-ket-hop-1",
      name: "Bó Hoa Kết Hợp Pastel",
      price: "550.000₫",
      image: "https://nhahoa.vn/wp-content/uploads/2023/08/0173553580dc53820acd.jpg",
      description: "Bó hoa kết hợp hồng, cẩm tú cầu và hoa baby, tông màu pastel",
      category: "bo-hoa-ket-hop",
    },
    {
      id: "bo-hoa-ket-hop-2",
      name: "Bó Hoa Kết Hợp Rực Rỡ",
      price: "580.000₫",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljcanrpv4b0yc5",
      description: "Bó hoa kết hợp hồng, tulip và lily, tông màu rực rỡ",
      category: "bo-hoa-ket-hop",
    },
    {
      id: "bo-hoa-ket-hop-3",
      name: "Bó Hoa Kết Hợp Tinh Tế",
      price: "600.000₫",
      image: "https://lala.com.vn/_next/image?url=https%3A%2F%2Fstc.subi.vn%2Fimage%2F1%2F210504%2Fbo-hoa-tien-kem-sap-thom-hinh-trai-tim-50-to.jpg&w=828&q=75",
      description: "Bó hoa kết hợp hồng trắng, cẩm tú cầu xanh và hoa baby",
      category: "bo-hoa-ket-hop",
    },
    {
      id: "hop-hoa-vuong",
      name: "Hộp Hoa Vuông",
      price: "650.000₫",
      image: "https://product.hstatic.net/200000277863/product/hop_qua_kem_hoa_tuoi_6_0d69c280e8894bd382ea3b938867370b_master.jpg",
      description: "Hộp hoa vuông với hoa hồng sáp thơm và hoa phụ",
      category: "hop-hoa",
    },
  ]
  
  // Categories data
  const categories = [
    { value: "hoa-hong", label: "Hoa Hồng" },
    { value: "hoa-tulip", label: "Hoa Tulip" },
    { value: "hoa-cam-tu-cau", label: "Hoa Cẩm Tú Cầu" },
    { value: "hoa-lily", label: "Hoa Lily" },
    { value: "bo-hoa-ket-hop", label: "Bó Hoa Kết Hợp" },
    { value: "hop-hoa", label: "Hộp Hoa" },
  ]
  
  // Function to format price
  function formatPrice(price) {
    if (typeof price === "string") {
      return price
    }
    return price.toLocaleString() + "₫"
  }
  
  // Function to parse price from string to number
  function parsePrice(priceString) {
    return Number.parseInt(priceString.replace(/\D/g, ""))
  }
  
  // Function to create product card HTML
  function createProductCard(product) {
    return `
          <div class="product-card">
              <div class="product-image">
                  <a href="product-detail.html?id=${product.id}">
                      <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                  </a>
                  <button class="product-favorite" data-id="${product.id}">
                      <i class="fa-regular fa-heart"></i>
                  </button>
              </div>
              <div class="product-info">
                  <a href="product-detail.html?id=${product.id}">
                      <h3 class="product-name">${product.name}</h3>
                  </a>
                  <p class="product-description">${product.description}</p>
                  <p class="product-price">${product.price}</p>
                  <div class="product-actions">
                      <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">
                          <i class="fa-solid fa-cart-shopping"></i>
                          Thêm vào giỏ
                      </button>
                  </div>
              </div>
          </div>
      `
  }
  
  // Function to get product by ID
  function getProductById(id) {
    return products.find((product) => product.id === id)
  }
  
  // Function to get related products
  function getRelatedProducts(product, limit = 4) {
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
  }
  
  // Function to filter products
  function filterProducts(options = {}) {
    const { category = "all", search = "", minPrice = 0, maxPrice = 1000000, sortBy = "featured" } = options
  
    const filtered = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      const price = parsePrice(product.price)
      const matchesPrice = price >= minPrice && price <= maxPrice
  
      return matchesCategory && matchesSearch && matchesPrice
    })
  
    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case "price-desc":
        filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // 'featured' - no sorting needed
        break
    }
  
    return filtered
  }
  
  // Initialize product favorite buttons
  function initProductFavorites() {
    const favoriteButtons = document.querySelectorAll(".product-favorite")
  
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
    // Update initial state
    favoriteButtons.forEach((button) => {
      const productId = button.dataset.id
      if (favorites.includes(productId)) {
        button.classList.add("active")
        button.querySelector("i").classList.remove("fa-regular")
        button.querySelector("i").classList.add("fa-solid")
      }
    })
  
    // Add click event listeners
    favoriteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
  
        const productId = button.dataset.id
        const isFavorite = button.classList.contains("active")
  
        // Update UI
        if (isFavorite) {
          button.classList.remove("active")
          button.querySelector("i").classList.remove("fa-solid")
          button.querySelector("i").classList.add("fa-regular")
        } else {
          button.classList.add("active")
          button.querySelector("i").classList.remove("fa-regular")
          button.querySelector("i").classList.add("fa-solid")
        }
  
        // Update localStorage
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  
        if (isFavorite) {
          const index = favorites.indexOf(productId)
          if (index !== -1) {
            favorites.splice(index, 1)
          }
          showToast(
            "success",
            "Đã xóa khỏi danh sách yêu thích",
            `${getProductById(productId).name} đã được xóa khỏi danh sách yêu thích của bạn.`,
          )
        } else {
          favorites.push(productId)
          showToast(
            "success",
            "Đã thêm vào danh sách yêu thích",
            `${getProductById(productId).name} đã được thêm vào danh sách yêu thích của bạn.`,
          )
        }
  
        localStorage.setItem("favorites", JSON.stringify(favorites))
      })
    })
  }
  
  // Initialize add to cart buttons
  function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart")
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id
        const product = getProductById(productId)
  
        if (product) {
          addToCart(product)
          showToast("success", "Đã thêm vào giỏ hàng", `${product.name} đã được thêm vào giỏ hàng của bạn.`)
        }
      })
    })
  }
  
  // Mock showToast function
  function showToast(type, title, message) {
    console.log(`Toast: ${type} - ${title} - ${message}`)
  }
  
  // Mock addToCart function
  function addToCart(product) {
    console.log(`Added to cart: ${product.name}`)
  }
  