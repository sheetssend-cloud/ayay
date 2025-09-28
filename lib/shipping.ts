export interface ShippingProvider {
  id: string
  name: string
  nameEn: string
  logo: string
  type: "standard" | "express" | "same-day"
  isActive: boolean
  trackingUrl: string
  apiEndpoint?: string
  apiKey?: string
  supportedServices: ShippingService[]
}

export interface ShippingService {
  id: string
  name: string
  nameEn: string
  description: string
  deliveryTime: string
  price: number
  freeShippingThreshold?: number
  maxWeight: number
  maxDimensions: {
    length: number
    width: number
    height: number
  }
  codSupported: boolean
  insuranceAvailable: boolean
  trackingIncluded: boolean
}

export interface ShippingZone {
  id: string
  name: string
  provinces: string[]
  multiplier: number
}

export interface TrackingInfo {
  trackingNumber: string
  status: "pending" | "picked-up" | "in-transit" | "out-for-delivery" | "delivered" | "failed" | "returned"
  statusTh: string
  currentLocation?: string
  estimatedDelivery?: Date
  history: TrackingEvent[]
  lastUpdated: Date
}

export interface TrackingEvent {
  timestamp: Date
  status: string
  statusTh: string
  location: string
  description: string
}

export const shippingZones: ShippingZone[] = [
  {
    id: "bangkok-metro",
    name: "กรุงเทพฯ และปริมณฑล",
    provinces: ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "สมุทรสาคร", "นครปฐม"],
    multiplier: 1.0,
  },
  {
    id: "central",
    name: "ภาคกลาง",
    provinces: ["อยุธยา", "อ่างทอง", "ชัยนาท", "ลพบุรี", "สิงห์บุรี", "สระบุรี", "สุพรรณบุรี"],
    multiplier: 1.2,
  },
  {
    id: "north",
    name: "ภาคเหนือ",
    provinces: ["เชียงใหม่", "เชียงราย", "ลำปาง", "ลำพูน", "แม่ฮ่องสอน", "น่าน", "พะเยา", "แพร่", "อุตรดิตถ์"],
    multiplier: 1.5,
  },
  {
    id: "northeast",
    name: "ภาคอีสาน",
    provinces: ["นครราชสีมา", "บุรีรัมย์", "สุรินทร์", "ศีสะเกษ", "อุบลราชธานี", "ยศธร", "ชัยภูมิ", "อำนาจเจริญ"],
    multiplier: 1.4,
  },
  {
    id: "south",
    name: "ภาคใต้",
    provinces: ["สงขลา", "ภูเก็ต", "กระบี่", "ตรัง", "สตูล", "ปัตตานี", "ยะลา", "นราธิวาส", "ชุมพร"],
    multiplier: 1.6,
  },
]

export const shippingProviders: ShippingProvider[] = [
  {
    id: "thailand-post",
    name: "ไปรษณีย์ไทย",
    nameEn: "Thailand Post",
    logo: "/icons/thailand-post.svg",
    type: "standard",
    isActive: true,
    trackingUrl: "https://track.thailandpost.co.th/?trackNumber=",
    supportedServices: [
      {
        id: "ems",
        name: "EMS",
        nameEn: "Express Mail Service",
        description: "บริการไปรษณีย์ด่วนพิเศษ",
        deliveryTime: "1-2 วันทำการ",
        price: 45,
        freeShippingThreshold: 1000,
        maxWeight: 30,
        maxDimensions: { length: 60, width: 60, height: 60 },
        codSupported: true,
        insuranceAvailable: true,
        trackingIncluded: true,
      },
      {
        id: "registered",
        name: "ลงทะเบียน",
        nameEn: "Registered Mail",
        description: "ไปรษณีย์ลงทะเบียน",
        deliveryTime: "3-5 วันทำการ",
        price: 25,
        freeShippingThreshold: 500,
        maxWeight: 20,
        maxDimensions: { length: 50, width: 50, height: 50 },
        codSupported: false,
        insuranceAvailable: true,
        trackingIncluded: true,
      },
    ],
  },
  {
    id: "kerry-express",
    name: "Kerry Express",
    nameEn: "Kerry Express",
    logo: "/icons/kerry.svg",
    type: "express",
    isActive: true,
    trackingUrl: "https://th.kerryexpress.com/th/track/?track=",
    supportedServices: [
      {
        id: "kerry-standard",
        name: "Kerry Standard",
        nameEn: "Kerry Standard",
        description: "บริการจัดส่งมาตรฐาน",
        deliveryTime: "1-2 วันทำการ",
        price: 50,
        freeShippingThreshold: 800,
        maxWeight: 50,
        maxDimensions: { length: 80, width: 80, height: 80 },
        codSupported: true,
        insuranceAvailable: true,
        trackingIncluded: true,
      },
      {
        id: "kerry-express",
        name: "Kerry Express",
        nameEn: "Kerry Express",
        description: "บริการจัดส่งด่วน",
        deliveryTime: "ภายในวันเดียว",
        price: 80,
        maxWeight: 30,
        maxDimensions: { length: 60, width: 60, height: 60 },
        codSupported: true,
        insuranceAvailable: true,
        trackingIncluded: true,
      },
    ],
  },
  {
    id: "flash-express",
    name: "Flash Express",
    nameEn: "Flash Express",
    logo: "/icons/flash.svg",
    type: "express",
    isActive: true,
    trackingUrl: "https://www.flashexpress.co.th/tracking/?se=",
    supportedServices: [
      {
        id: "flash-standard",
        name: "Flash Standard",
        nameEn: "Flash Standard",
        description: "บริการจัดส่งมาตรฐาน",
        deliveryTime: "1-3 วันทำการ",
        price: 40,
        freeShippingThreshold: 600,
        maxWeight: 50,
        maxDimensions: { length: 100, width: 100, height: 100 },
        codSupported: true,
        insuranceAvailable: false,
        trackingIncluded: true,
      },
      {
        id: "flash-express",
        name: "Flash Express",
        nameEn: "Flash Express",
        description: "บริการจัดส่งด่วน",
        deliveryTime: "ภายใน 24 ชั่วโมง",
        price: 70,
        maxWeight: 30,
        maxDimensions: { length: 80, width: 80, height: 80 },
        codSupported: true,
        insuranceAvailable: false,
        trackingIncluded: true,
      },
    ],
  },
  {
    id: "j-t-express",
    name: "J&T Express",
    nameEn: "J&T Express",
    logo: "/icons/jt.svg",
    type: "express",
    isActive: true,
    trackingUrl: "https://www.jtexpress.co.th/trajectoryQuery?billCode=",
    supportedServices: [
      {
        id: "jt-standard",
        name: "J&T Standard",
        nameEn: "J&T Standard",
        description: "บริการจัดส่งมาตรฐาน",
        deliveryTime: "2-4 วันทำการ",
        price: 35,
        freeShippingThreshold: 500,
        maxWeight: 50,
        maxDimensions: { length: 100, width: 100, height: 100 },
        codSupported: true,
        insuranceAvailable: true,
        trackingIncluded: true,
      },
    ],
  },
]

export function calculateShippingCost(
  providerId: string,
  serviceId: string,
  zone: string,
  weight: number,
  orderValue: number,
): number {
  const provider = shippingProviders.find((p) => p.id === providerId)
  if (!provider) return 0

  const service = provider.supportedServices.find((s) => s.id === serviceId)
  if (!service) return 0

  // Check free shipping threshold
  if (service.freeShippingThreshold && orderValue >= service.freeShippingThreshold) {
    return 0
  }

  const shippingZone = shippingZones.find((z) => z.id === zone)
  const multiplier = shippingZone?.multiplier || 1.0

  // Base price with zone multiplier
  let cost = service.price * multiplier

  // Weight-based pricing (if over 1kg, add 10 baht per kg)
  if (weight > 1) {
    cost += (weight - 1) * 10
  }

  return Math.round(cost)
}

export function getAvailableShippingOptions(
  province: string,
  weight: number,
  dimensions: { length: number; width: number; height: number },
  orderValue: number,
) {
  const zone = shippingZones.find((z) => z.provinces.includes(province))
  if (!zone) return []

  const availableOptions: Array<{
    provider: ShippingProvider
    service: ShippingService
    cost: number
    zone: ShippingZone
  }> = []

  shippingProviders.forEach((provider) => {
    if (!provider.isActive) return

    provider.supportedServices.forEach((service) => {
      // Check weight and dimension limits
      if (weight > service.maxWeight) return
      if (
        dimensions.length > service.maxDimensions.length ||
        dimensions.width > service.maxDimensions.width ||
        dimensions.height > service.maxDimensions.height
      )
        return

      const cost = calculateShippingCost(provider.id, service.id, zone.id, weight, orderValue)

      availableOptions.push({
        provider,
        service,
        cost,
        zone,
      })
    })
  })

  return availableOptions.sort((a, b) => a.cost - b.cost)
}

export async function createShipment(
  orderId: string,
  shippingData: {
    providerId: string
    serviceId: string
    senderAddress: any
    recipientAddress: any
    packageInfo: {
      weight: number
      dimensions: { length: number; width: number; height: number }
      value: number
      description: string
    }
    codAmount?: number
  },
): Promise<{
  trackingNumber: string
  labelUrl?: string
  estimatedDelivery?: Date
}> {
  // In a real implementation, this would call the shipping provider's API
  // For demo purposes, return mock data

  const trackingNumber = `${shippingData.providerId.toUpperCase()}${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`

  return {
    trackingNumber,
    labelUrl: `/api/shipping/labels/${trackingNumber}`,
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  }
}

export async function trackShipment(trackingNumber: string): Promise<TrackingInfo | null> {
  // In a real implementation, this would call the shipping provider's tracking API
  // For demo purposes, return mock tracking data

  const mockTracking: TrackingInfo = {
    trackingNumber,
    status: "in-transit",
    statusTh: "กำลังขนส่ง",
    currentLocation: "ศูนย์คัดแยก กรุงเทพฯ",
    estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    history: [
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "picked-up",
        statusTh: "รับพัสดุแล้ว",
        location: "ศูนย์รับฝาก กรุงเทพฯ",
        description: "พัสดุถูกรับฝากที่ศูนย์รับฝาก",
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: "in-transit",
        statusTh: "กำลังขนส่ง",
        location: "ศูนย์คัดแยก กรุงเทพฯ",
        description: "พัสดุอยู่ระหว่างการขนส่ง",
      },
    ],
    lastUpdated: new Date(),
  }

  return mockTracking
}

export function getShippingProviderByTrackingNumber(trackingNumber: string): ShippingProvider | null {
  // Simple logic to determine provider by tracking number format
  if (trackingNumber.startsWith("EMS") || trackingNumber.startsWith("R")) {
    return shippingProviders.find((p) => p.id === "thailand-post") || null
  }
  if (trackingNumber.includes("KERRY")) {
    return shippingProviders.find((p) => p.id === "kerry-express") || null
  }
  if (trackingNumber.includes("FLASH")) {
    return shippingProviders.find((p) => p.id === "flash-express") || null
  }
  if (trackingNumber.includes("JT")) {
    return shippingProviders.find((p) => p.id === "j-t-express") || null
  }

  return null
}

export const thailandProvinces = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงราย",
  "เชียงใหม่",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บึงกาฬ",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยโสธร",
  "ยะลา",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อำนาจเจริญ",
  "อุดรธานี",
  "อุตรดิตถ์",
  "อุทัยธานี",
  "อุบลราชธานี",
]
