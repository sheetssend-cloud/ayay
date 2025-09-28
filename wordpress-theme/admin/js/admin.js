import { Chart } from "@/components/ui/chart"
const jQuery = window.jQuery
const opensheets_admin = window.opensheets_admin

jQuery(document).ready(($) => {
  // Load dashboard stats
  if ($(".opensheets-dashboard").length) {
    loadDashboardStats()
    initCharts()
  }

  // Load dashboard stats
  function loadDashboardStats() {
    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_get_stats",
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          $("#total-sales").text(formatPrice(response.data.total_sales))
          $("#total-orders").text(response.data.total_orders)
          $("#low-stock").text(response.data.low_stock)
        }
      },
    })
  }

  // Initialize charts
  function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById("sales-chart")
    if (salesCtx) {
      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "ยอดขาย (฿)",
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              borderColor: "#2563eb",
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => formatPrice(value),
              },
            },
          },
        },
      })
    }

    // Products Chart
    const productsCtx = document.getElementById("products-chart")
    if (productsCtx) {
      new Chart(productsCtx, {
        type: "doughnut",
        data: {
          labels: ["หนังสือเตรียมสอบ", "แบบทดสอบ", "สรุปเนื้อหา"],
          datasets: [
            {
              data: [45, 30, 25],
              backgroundColor: ["#2563eb", "#7c3aed", "#dc2626"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      })
    }
  }

  // Order status change
  $(".order-status-select").on("change", function () {
    const orderId = $(this).data("order-id")
    const newStatus = $(this).val()

    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_update_order_status",
        order_id: orderId,
        status: newStatus,
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          showNotice("สถานะคำสั่งซื้อถูกอัปเดตแล้ว", "success")
        } else {
          showNotice("เกิดข้อผิดพลาด", "error")
        }
      },
    })
  })

  // Stock update
  $(".update-stock-btn").on("click", function () {
    const productId = $(this).data("product-id")
    const stockValue = $(this).closest("tr").find(".stock-input").val()

    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_update_stock",
        product_id: productId,
        stock: stockValue,
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          showNotice("สต็อกสินค้าถูกอัปเดตแล้ว", "success")
          // Update stock status
          updateStockStatus(productId, stockValue)
        } else {
          showNotice("เกิดข้อผิดพลาด", "error")
        }
      },
    })
  })

  // Bulk stock update
  $("#bulk-update-stock").on("click", () => {
    const selectedProducts = $(".product-checkbox:checked")
    if (selectedProducts.length === 0) {
      alert("กรุณาเลือกสินค้าที่ต้องการอัปเดต")
      return
    }

    const updates = []
    selectedProducts.each(function () {
      const productId = $(this).val()
      const stockValue = $(this).closest("tr").find(".stock-input").val()
      updates.push({
        product_id: productId,
        stock: stockValue,
      })
    })

    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_bulk_update_stock",
        updates: updates,
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          showNotice("สต็อกสินค้าถูกอัปเดตแล้ว", "success")
          location.reload()
        } else {
          showNotice("เกิดข้อผิดพลาด", "error")
        }
      },
    })
  })

  // Export functionality
  $("#export-orders").on("click", () => {
    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_export_orders",
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          downloadCSV(response.data.csv_data, response.data.filename)
        }
      },
    })
  })

  // Reports
  $("#generate-report").on("click", () => {
    const period = $("#report-period").val()
    let dateFrom = ""
    let dateTo = ""

    if (period === "custom") {
      dateFrom = $("#report-date-from").val()
      dateTo = $("#report-date-to").val()
    }

    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_generate_report",
        period: period,
        date_from: dateFrom,
        date_to: dateTo,
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          updateReportDisplay(response.data)
        }
      },
    })
  })

  // Report period change
  $("#report-period").on("change", function () {
    if ($(this).val() === "custom") {
      $("#custom-date-range").show()
    } else {
      $("#custom-date-range").hide()
    }
  })

  // Coupon management
  $("#add-new-coupon").on("click", () => {
    $("#coupon-modal").show()
    $("#coupon-form")[0].reset()
    $("#coupon-id").val("")
    $("#modal-title").text("เพิ่มคูปองใหม่")
  })

  // Close modal
  $(".close, .cancel-btn").on("click", () => {
    $("#coupon-modal").hide()
  })

  // Coupon form submit
  $("#coupon-form").on("submit", function (e) {
    e.preventDefault()

    const formData = $(this).serialize()

    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: formData + "&action=opensheets_save_coupon&nonce=" + opensheets_admin.nonce,
      success: (response) => {
        if (response.success) {
          $("#coupon-modal").hide()
          showNotice("คูปองถูกบันทึกแล้ว", "success")
          loadCoupons()
        } else {
          showNotice("เกิดข้อผิดพลาด", "error")
        }
      },
    })
  })

  // Select all checkbox
  $("#select-all").on("change", function () {
    $(".product-checkbox").prop("checked", $(this).prop("checked"))
  })

  // Helper functions
  function formatPrice(amount) {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount)
  }

  function showNotice(message, type) {
    const noticeClass = type === "success" ? "notice-success" : "notice-error"
    const notice = $('<div class="notice ' + noticeClass + ' is-dismissible"><p>' + message + "</p></div>")
    $(".wrap").prepend(notice)

    setTimeout(() => {
      notice.fadeOut()
    }, 3000)
  }

  function updateStockStatus(productId, stock) {
    const row = $('[data-product-id="' + productId + '"]').closest("tr")
    const statusCell = row.find(".stock-status")

    let statusClass = "in-stock"
    let statusText = "มีสินค้า"

    if (stock <= 0) {
      statusClass = "out-of-stock"
      statusText = "หมด"
    } else if (stock <= 5) {
      statusClass = "low-stock"
      statusText = "เหลือน้อย"
    }

    statusCell.removeClass("in-stock low-stock out-of-stock").addClass(statusClass).text(statusText)
  }

  function downloadCSV(data, filename) {
    const csvContent = data.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function updateReportDisplay(data) {
    $("#report-total-sales").text(formatPrice(data.total_sales))
    $("#report-total-orders").text(data.total_orders)
    $("#report-avg-order").text(formatPrice(data.avg_order))

    // Update charts and tables with new data
    // Implementation depends on specific chart library and data structure
  }

  function loadCoupons() {
    $.ajax({
      url: opensheets_admin.ajax_url,
      type: "POST",
      data: {
        action: "opensheets_get_coupons",
        nonce: opensheets_admin.nonce,
      },
      success: (response) => {
        if (response.success) {
          updateCouponsTable(response.data)
        }
      },
    })
  }

  function updateCouponsTable(coupons) {
    const tbody = $("#coupons-list")
    tbody.empty()

    coupons.forEach((coupon) => {
      const row = `
                <tr>
                    <td><strong>${coupon.code}</strong></td>
                    <td>${coupon.type}</td>
                    <td>${coupon.value}</td>
                    <td>${coupon.conditions}</td>
                    <td>${coupon.expiry}</td>
                    <td>${coupon.status}</td>
                    <td>
                        <button class="button button-small edit-coupon" data-coupon-id="${coupon.id}">แก้ไข</button>
                        <button class="button button-small delete-coupon" data-coupon-id="${coupon.id}">ลบ</button>
                    </td>
                </tr>
            `
      tbody.append(row)
    })
  }
})
