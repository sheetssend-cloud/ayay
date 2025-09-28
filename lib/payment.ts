export interface PaymentGateway {
  id: string
  name: string
  nameEn: string
  type: "bank" | "ewallet" | "card" | "cod"
  icon: string
  fee: number
  feeType: "fixed" | "percentage"
  minAmount?: number
  maxAmount?: number
  isActive: boolean
  supportedCurrencies: string[]
  processingTime: string
  description: string
}

export const paymentGateways: PaymentGateway[] = [
  {
    id: "promptpay",
    name: "PromptPay QR Code",
    nameEn: "PromptPay",
    type: "bank",
    icon: "/icons/promptpay.svg",
    fee: 0,
    feeType: "fixed",
    minAmount: 1,
    maxAmount: 50000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "ทันที",
    description: "สแกน QR Code ผ่านแอปธนาคาร รวดเร็วและปลอดภัย",
  },
  {
    id: "scb-easy",
    name: "SCB Easy",
    nameEn: "SCB Easy",
    type: "bank",
    icon: "/icons/scb.svg",
    fee: 0,
    feeType: "fixed",
    minAmount: 1,
    maxAmount: 2000000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "ทันที",
    description: "Mobile Banking ธนาคารไทยพาณิชย์",
  },
  {
    id: "kbank-plus",
    name: "K PLUS",
    nameEn: "K PLUS",
    type: "bank",
    icon: "/icons/kbank.svg",
    fee: 0,
    feeType: "fixed",
    minAmount: 1,
    maxAmount: 2000000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "ทันที",
    description: "Mobile Banking ธนาคารกสิกรไทย",
  },
  {
    id: "truemoney",
    name: "TrueMoney Wallet",
    nameEn: "TrueMoney",
    type: "ewallet",
    icon: "/icons/truemoney.svg",
    fee: 0,
    feeType: "fixed",
    minAmount: 1,
    maxAmount: 30000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "ทันที",
    description: "กระเป๋าเงินดิจิทัล TrueMoney",
  },
  {
    id: "rabbit-linepay",
    name: "Rabbit LINE Pay",
    nameEn: "Rabbit LINE Pay",
    type: "ewallet",
    icon: "/icons/rabbit-linepay.svg",
    fee: 0,
    feeType: "fixed",
    minAmount: 1,
    maxAmount: 50000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "ทันที",
    description: "ชำระผ่าน Rabbit LINE Pay",
  },
  {
    id: "credit-card",
    name: "บัตรเครดิต/เดบิต",
    nameEn: "Credit/Debit Card",
    type: "card",
    icon: "/icons/credit-card.svg",
    fee: 2.95,
    feeType: "percentage",
    minAmount: 20,
    maxAmount: 500000,
    isActive: true,
    supportedCurrencies: ["THB", "USD"],
    processingTime: "ทันที",
    description: "Visa, Mastercard, JCB, American Express",
  },
  {
    id: "cod",
    name: "เก็บเงินปลายทาง",
    nameEn: "Cash on Delivery",
    type: "cod",
    icon: "/icons/cod.svg",
    fee: 30,
    feeType: "fixed",
    minAmount: 100,
    maxAmount: 20000,
    isActive: true,
    supportedCurrencies: ["THB"],
    processingTime: "เมื่อได้รับสินค้า",
    description: "ชำระเงินสดเมื่อได้รับสินค้า",
  },
]

export interface PaymentTransaction {
  id: string
  orderId: string
  gatewayId: string
  amount: number
  fee: number
  currency: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "refunded"
  transactionId?: string
  gatewayTransactionId?: string
  paymentMethod: string
  paidAt?: Date
  failureReason?: string
  refundAmount?: number
  refundedAt?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export function calculatePaymentFee(gatewayId: string, amount: number): number {
  const gateway = paymentGateways.find((g) => g.id === gatewayId)
  if (!gateway) return 0

  if (gateway.feeType === "fixed") {
    return gateway.fee
  } else {
    return Math.round((amount * gateway.fee) / 100)
  }
}

export function getAvailablePaymentMethods(amount: number): PaymentGateway[] {
  return paymentGateways.filter((gateway) => {
    if (!gateway.isActive) return false
    if (gateway.minAmount && amount < gateway.minAmount) return false
    if (gateway.maxAmount && amount > gateway.maxAmount) return false
    return true
  })
}

export function formatPaymentMethod(gatewayId: string): string {
  const gateway = paymentGateways.find((g) => g.id === gatewayId)
  return gateway?.name || "ไม่ระบุ"
}

export async function createPaymentTransaction(
  orderId: string,
  gatewayId: string,
  amount: number,
  currency = "THB",
): Promise<PaymentTransaction> {
  const gateway = paymentGateways.find((g) => g.id === gatewayId)
  if (!gateway) {
    throw new Error("Payment gateway not found")
  }

  const fee = calculatePaymentFee(gatewayId, amount)

  const transaction: PaymentTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderId,
    gatewayId,
    amount,
    fee,
    currency,
    status: "pending",
    paymentMethod: gateway.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // In a real implementation, you would:
  // 1. Save to database
  // 2. Call payment gateway API
  // 3. Handle webhook responses
  // 4. Update transaction status

  return transaction
}

export async function verifyPaymentStatus(transactionId: string): Promise<PaymentTransaction | null> {
  // In a real implementation, query the payment gateway API
  // For demo purposes, return mock data
  return null
}
