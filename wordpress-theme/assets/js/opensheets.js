// OPEN SHEETS Frontend JavaScript
;(($) => {
  const OpenSheets = {
    init: function () {
      this.bindEvents()
      this.updateCartCount()
      this.initSearch()
    },

    bindEvents: function () {
      // Add to cart
      $(document).on("click", ".add-to-cart-btn", this.addToCart)

      // Remove from cart
      $(document).on("click", ".remove-from-cart", this.removeFromCart)

      // Update cart quantity
      $(document).on("change", ".cart-quantity", this.updateCartQuantity)

      // Process order
      $(document).on("submit", "#checkout-form", this.processOrder)

      // Track order
      $(document).on("submit", "#track-order-form", this.trackOrder)

      // Apply coupon
      $(document).on("click", "#apply-coupon", this.applyCoupon)

      // Add to wishlist
      $(document).on("click", ".add-to-wishlist", this.addToWishlist)

      // Search products
      $(document).on("submit", "#product-search-form", this.searchProducts)

      // Filter products
      $(document).on("change", ".product-filter", this.filterProducts)
    },

    addToCart: function (e) {
      e.preventDefault()

      const $btn = $(this)
      const productId = $btn.data("product-id")
      const quantity = $btn.closest(".product-card").find(".quantity-input").val() || 1

      $btn.prop("disabled", true).text("กำลังเพิ่ม...")

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "add_to_cart",
          product_id: productId,
          quantity: quantity,
          nonce: window.opensheets_ajax.nonce,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.showNotification(data.message, "success")
            OpenSheets.updateCartCount()

            // Update cart icon animation
            $(".cart-icon").addClass("bounce")
            setTimeout(() => $(".cart-icon").removeClass("bounce"), 600)
          } else {
            OpenSheets.showNotification(data.message, "error")
          }
        },
        error: () => {
          OpenSheets.showNotification("เกิดข้อผิดพลาด กรุณาลองใหม่", "error")
        },
        complete: () => {
          $btn.prop("disabled", false).text("เพิ่มในตะกร้า")
        },
      })
    },

    removeFromCart: function (e) {
      e.preventDefault()

      const $btn = $(this)
      const productId = $btn.data("product-id")

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "remove_from_cart",
          product_id: productId,
          nonce: window.opensheets_ajax.nonce,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            $btn.closest(".cart-item").fadeOut()
            OpenSheets.showNotification(data.message, "success")
            OpenSheets.updateCartCount()
            OpenSheets.updateCartTotal()
          }
        },
      })
    },

    updateCartQuantity: function (e) {
      const $input = $(this)
      const productId = $input.data("product-id")
      const quantity = Number.parseInt($input.val())

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "update_cart_quantity",
          product_id: productId,
          quantity: quantity,
          nonce: window.opensheets_ajax.nonce,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.updateCartCount()
            OpenSheets.updateCartTotal()
          }
        },
      })
    },

    processOrder: function (e) {
      e.preventDefault()

      const $form = $(this)
      const $submitBtn = $form.find('button[type="submit"]')

      $submitBtn.prop("disabled", true).text("กำลังดำเนินการ...")

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: $form.serialize() + "&action=process_order&nonce=" + window.opensheets_ajax.nonce,
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.showNotification(data.message, "success")

            // Redirect to thank you page
            window.location.href = "/thank-you/?order=" + data.order_number
          } else {
            OpenSheets.showNotification(data.message, "error")
          }
        },
        error: () => {
          OpenSheets.showNotification("เกิดข้อผิดพลาด กรุณาลองใหม่", "error")
        },
        complete: () => {
          $submitBtn.prop("disabled", false).text("สั่งซื้อ")
        },
      })
    },

    trackOrder: function (e) {
      e.preventDefault()

      const $form = $(this)
      const orderNumber = $form.find('input[name="order_number"]').val()

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "track_order",
          order_number: orderNumber,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.displayOrderInfo(data.order, data.items)
          } else {
            OpenSheets.showNotification(data.message, "error")
          }
        },
      })
    },

    applyCoupon: (e) => {
      e.preventDefault()

      const couponCode = $("#coupon-code").val()

      if (!couponCode) {
        OpenSheets.showNotification("กรุณาใส่รหัสคูปอง", "error")
        return
      }

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "apply_coupon",
          coupon_code: couponCode,
          nonce: window.opensheets_ajax.nonce,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.showNotification(data.message, "success")
            $(".discount-amount").text(data.discount.toLocaleString() + " บาท")
            $(".total-amount").text(data.total.toLocaleString() + " บาท")
            $("#coupon-applied").show()
          } else {
            OpenSheets.showNotification(data.message, "error")
          }
        },
      })
    },

    addToWishlist: function (e) {
      e.preventDefault()

      const $btn = $(this)
      const productId = $btn.data("product-id")

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "add_to_wishlist",
          product_id: productId,
          nonce: window.opensheets_ajax.nonce,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            $btn.addClass("active").html('<i class="fas fa-heart"></i>')
            OpenSheets.showNotification(data.message, "success")
          } else {
            OpenSheets.showNotification(data.message, "error")
          }
        },
      })
    },

    searchProducts: function (e) {
      e.preventDefault()

      const $form = $(this)
      const searchData = $form.serialize() + "&action=search_products"

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: searchData,
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.displaySearchResults(data.products)
          }
        },
      })
    },

    filterProducts: () => {
      const category = $("#category-filter").val()
      const minPrice = $("#min-price").val()
      const maxPrice = $("#max-price").val()

      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "search_products",
          category: category,
          min_price: minPrice,
          max_price: maxPrice,
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            OpenSheets.displaySearchResults(data.products)
          }
        },
      })
    },

    updateCartCount: () => {
      $.ajax({
        url: window.opensheets_ajax.ajax_url,
        type: "POST",
        data: {
          action: "get_cart_count",
        },
        success: (response) => {
          const data = JSON.parse(response)

          if (data.success) {
            $(".cart-count").text(data.count)

            if (data.count > 0) {
              $(".cart-count").show()
            } else {
              $(".cart-count").hide()
            }
          }
        },
      })
    },

    updateCartTotal: () => {
      // Recalculate and update cart total
      let total = 0
      $(".cart-item").each(function () {
        const price = Number.parseFloat($(this).find(".item-price").data("price"))
        const quantity = Number.parseInt($(this).find(".cart-quantity").val())
        total += price * quantity
      })

      $(".cart-total").text(total.toLocaleString() + " บาท")
    },

    displaySearchResults: (products) => {
      const $container = $("#products-container")
      $container.empty()

      if (products.length === 0) {
        $container.html('<p class="text-center">ไม่พบสินค้าที่ค้นหา</p>')
        return
      }

      products.forEach((product) => {
        const productHtml = `
                    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="font-semibold text-lg mb-2">${product.title}</h3>
                            <p class="text-blue-600 font-bold text-xl mb-3">${product.price.toLocaleString()} บาท</p>
                            <button class="add-to-cart-btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" 
                                    data-product-id="${product.id}">
                                เพิ่มในตะกร้า
                            </button>
                        </div>
                    </div>
                `
        $container.append(productHtml)
      })
    },

    displayOrderInfo: (order, items) => {
      const orderHtml = `
                <div class="order-info bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold mb-4">ข้อมูลคำสั่งซื้อ: ${order.order_number}</h3>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p><strong>ชื่อ:</strong> ${order.customer_name}</p>
                            <p><strong>เบอร์โทร:</strong> ${order.customer_phone}</p>
                            <p><strong>อีเมล:</strong> ${order.customer_email}</p>
                        </div>
                        <div>
                            <p><strong>สถานะ:</strong> <span class="status-${order.status}">${OpenSheets.getStatusText(order.status)}</span></p>
                            <p><strong>วันที่สั่ง:</strong> ${new Date(order.created_at).toLocaleDateString("th-TH")}</p>
                            <p><strong>ยอดรวม:</strong> ${Number.parseFloat(order.total).toLocaleString()} บาท</p>
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-2">รายการสินค้า:</h4>
                    <div class="order-items">
                        ${items
                          .map(
                            (item) => `
                            <div class="flex justify-between py-2 border-b">
                                <span>${item.product_name} x ${item.quantity}</span>
                                <span>${(Number.parseFloat(item.price) * Number.parseInt(item.quantity)).toLocaleString()} บาท</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            `

      $("#order-result").html(orderHtml)
    },

    getStatusText: (status) => {
      const statusMap = {
        pending: "รอดำเนินการ",
        processing: "กำลังจัดเตรียม",
        shipped: "จัดส่งแล้ว",
        delivered: "ส่งถึงแล้ว",
        cancelled: "ยกเลิก",
      }

      return statusMap[status] || status
    },

    showNotification: (message, type = "info") => {
      const notification = $(`
                <div class="notification notification-${type} fixed top-4 right-4 bg-white border-l-4 p-4 rounded shadow-lg z-50">
                    <div class="flex items-center">
                        <div class="ml-3">
                            <p class="text-sm font-medium">${message}</p>
                        </div>
                        <button class="ml-auto close-notification">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `)

      $("body").append(notification)

      // Auto remove after 5 seconds
      setTimeout(() => {
        notification.fadeOut(() => notification.remove())
      }, 5000)

      // Manual close
      notification.find(".close-notification").click(() => {
        notification.fadeOut(() => notification.remove())
      })
    },

    initSearch: () => {
      // Initialize search autocomplete
      $("#search-input").on("input", function () {
        const query = $(this).val()

        if (query.length > 2) {
          // Implement search suggestions
          OpenSheets.showSearchSuggestions(query)
        }
      })
    },

    showSearchSuggestions: (query) => {
      // Implementation for search suggestions
      // This would typically query the server for matching products
    },
  }

  // Initialize when document is ready
  $(document).ready(() => {
    OpenSheets.init()
  })

  // Make OpenSheets globally available
  window.OpenSheets = OpenSheets
})(window.jQuery)
