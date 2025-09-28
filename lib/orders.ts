export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  shippingAddress: {
    address: string
    district: string
    province: string
    postalCode: string
  }
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customerName: "สมชาย ใจดี",
    customerEmail: "somchai@email.com",
    customerPhone: "081-234-5678",
    items: [
      {
        id: "1",
        name: "แนวข้อสอบ เจ้าพนักงานเศรษฐกิจ ระดับปฏิบัติงาน",
        price: 380,
        quantity: 1,
        image: "/public/images/thai-exam-book.png",
      },
    ],
    total: 380,
    status: "confirmed",
    paymentMethod: "โอนผ่านธนาคาร",
    shippingAddress: {
      address: "123 ถนนสุขุมวิท",
      district: "คลองเตย",
      province: "กรุงเทพมหานคร",
      postalCode: "10110",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    trackingNumber: "TH123456789",
  },
  {
    id: "ORD-2024-002",
    customerName: "สมหญิง รักเรียน",
    customerEmail: "somying@email.com",
    customerPhone: "082-345-6789",
    items: [
      {
        id: "2",
        name: "หนังสือเตรียมสอบ นักวิเคราะห์นโยบายและแผน",
        price: 450,
        quantity: 2,
        image: "/thai-policy-analysis-exam-book.jpg",
      },
    ],
    total: 900,
    status: "processing",
    paymentMethod: "บัตรเครดิต",
    shippingAddress: {
      address: "456 ถนนพหลโยธิน",
      district: "จตุจักร",
      province: "กรุงเทพมหานคร",
      postalCode: "10900",
    },
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "ORD-2024-003",
    customerName: "วิชัย สมาร์ท",
    customerEmail: "wichai@email.com",
    customerPhone: "083-456-7890",
    items: [
      {
        id: "3",
        name: "คู่มือสอบ นักทรัพยากรบุคคล",
        price: 320,
        quantity: 1,
        image: "/thai-hr-exam-preparation-book.jpg",
      },
    ],
    total: 320,
    status: "shipped",
    paymentMethod: "พร้อมเพย์",
    shippingAddress: {
      address: "789 ถนนรัชดาภิเษก",
      district: "ห้วยขวาง",
      province: "กรุงเทพมหานคร",
      postalCode: "10310",
    },
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
    trackingNumber: "TH987654321",
  },
]

export const getOrders = (): Order[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("orders")
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return mockOrders
}

export const saveOrders = (orders: Order[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("orders", JSON.stringify(orders))
  }
}

export const updateOrderStatus = (orderId: string, status: Order["status"], trackingNumber?: string) => {
  const orders = getOrders()
  const orderIndex = orders.findIndex((order) => order.id === orderId)

  if (orderIndex !== -1) {
    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()
    if (trackingNumber) {
      orders[orderIndex].trackingNumber = trackingNumber
    }
    saveOrders(orders)
  }
}

export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders()
  return orders.find((order) => order.id === orderId)
}

export const getOrdersByEmail = (email: string): Order[] => {
  const orders = getOrders()
  return orders.filter((order) => order.customerEmail === email)
}

export const addOrder = (order: Order) => {
  const orders = getOrders()
  orders.unshift(order)
  saveOrders(orders)
}

export const getOrderStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-purple-100 text-purple-800"
    case "shipped":
      return "bg-orange-100 text-orange-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getOrderStatusText = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "รอดำเนินการ"
    case "confirmed":
      return "ยืนยันแล้ว"
    case "processing":
      return "กำลังเตรียมสินค้า"
    case "shipped":
      return "จัดส่งแล้ว"
    case "delivered":
      return "ส่งสำเร็จ"
    case "cancelled":
      return "ยกเลิก"
    default:
      return status
  }
}
