export interface ProductVariant {
  id: string
  name: string
  price: number
  originalPrice?: number
  sku: string
  inStock: boolean
  stockQuantity: number
}

export interface DigitalAsset {
  id: string
  name: string
  type: "pdf" | "epub" | "zip" | "video" | "audio"
  url: string
  size: string
  downloadLimit?: number
  expiryDays?: number
  watermark: boolean
}

export interface ProductSpecification {
  key: string
  value: string
}

export interface Product {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  tags: string[]
  image: string
  images: string[]
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  features: string[]
  specifications: ProductSpecification[]
  format: "physical" | "digital" | "bundle"

  // Digital product specific
  digitalAssets?: DigitalAsset[]
  previewContent?: string
  onlineReader?: boolean

  // Physical product specific
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }

  // Marketing
  isFeatured: boolean
  isNew: boolean
  isBestseller: boolean
  isOnSale: boolean

  // SEO
  metaTitle?: string
  metaDescription?: string

  // Variants (for different versions/editions)
  variants?: ProductVariant[]

  // Related products
  relatedProducts?: string[]

  // Publication info
  publisher?: string
  author?: string
  isbn?: string
  publicationYear?: number
  pages?: number
  language: "th" | "en" | "both"

  // Exam specific
  examType?: string
  examLevel?: string
  examYear?: number
  targetPosition?: string

  createdAt: Date
  updatedAt: Date
}

export const products: Product[] = [
  {
    id: "1",
    name: "แนวข้อสอบ เจ้าพนักงานเศรษฐกรรม ระดับปฏิบัติงาน",
    nameEn: "Civil Service Economics Officer Exam Prep",
    slug: "economics-officer-exam-prep-2568",
    description:
      "รายละเอียดสมบูรณ์สำหรับ แนวข้อสอบ เจ้าพนักงานเศรษฐกรรม ระดับปฏิบัติงาน องค์การบริหารส่วนจังหวัดสองแก้ว ประจำปี 2568 พร้อมเฉลยละเอียดและคำอธิบายครบถ้วน รวมถึงแนวข้อสอบย้อนหลัง 5 ปี และเทคนิคการทำข้อสอบที่มีประสิทธิภาพ",
    shortDescription: "แนวข้อสอบเจ้าพนักงานเศรษฐกรรม ระดับปฏิบัติงาน พร้อมเฉลยละเอียด",
    price: 380,
    originalPrice: 450,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติงาน",
    tags: ["เจ้าพนักงานเศรษฐกรรม", "ระดับปฏิบัติงาน", "องค์การบริหารส่วนจังหวัดสองแก้ว", "2568"],
    image: "/images/thai-exam-book.png",
    images: [
      "/images/thai-exam-book.png",
      "/thai-education-exam-book-cover.jpg",
      "/thai-policy-analysis-exam-book.jpg",
    ],
    inStock: true,
    stockQuantity: 150,
    rating: 4.8,
    reviewCount: 127,
    features: [
      "บริหารจัดการงบประมาณ ระดับปฏิบัติงาน",
      "เศรษฐศาสตร์ ระดับปฏิบัติงาน",
      "หลักอุณหการณ์ทั่วไป เพื่อให้การสอบดี",
      "พร้อมเฉลยแบบละเอียดการสอบสำคัญทุกข้อ",
      "แนวข้อสอบย้อนหลัง 5 ปี",
      "เทคนิคการทำข้อสอบอย่างมีประสิทธิภาพ",
    ],
    specifications: [
      { key: "จำนวนหน้า", value: "450 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "กระดาษ", value: "กระดาษปอนด์ 80 แกรม" },
      { key: "ปกแข็ง", value: "ใช่" },
      { key: "สี", value: "ขาวดำ + สีในส่วนสำคัญ" },
    ],
    format: "bundle",
    digitalAssets: [
      {
        id: "da1",
        name: "E-book แนวข้อสอบเศรษฐกรรม",
        type: "pdf",
        url: "/downloads/economics-exam-ebook.pdf",
        size: "25 MB",
        downloadLimit: 3,
        expiryDays: 365,
        watermark: true,
      },
      {
        id: "da2",
        name: "วิดีโอเฉลยข้อสอบ",
        type: "video",
        url: "/downloads/economics-exam-solutions.mp4",
        size: "1.2 GB",
        downloadLimit: 5,
        expiryDays: 365,
        watermark: false,
      },
    ],
    previewContent: "ตัวอย่างเนื้อหา: บทที่ 1 หลักเศรษฐศาสตร์เบื้องต้น...",
    onlineReader: true,
    weight: 0.8,
    dimensions: { length: 29.7, width: 21, height: 2.5 },
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    metaTitle: "แนวข้อสอบเจ้าพนักงานเศรษฐกรรม 2568 | SHEET88",
    metaDescription: "แนวข้อสอบเจ้าพนักงานเศรษฐกรรม ระดับปฏิบัติงาน พร้อมเฉลยละเอียด อัพเดท 2568",
    relatedProducts: ["2", "3", "6"],
    publisher: "SHEET88 Publishing",
    author: "ทีมงาน SHEET88",
    isbn: "978-616-123-456-7",
    publicationYear: 2024,
    pages: 450,
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติงาน",
    examYear: 2568,
    targetPosition: "เจ้าพนักงานเศรษฐกรรม",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    name: "แนวข้อสอบ นักวิชาการศึกษา ปฏิบัติการ",
    nameEn: "Education Specialist Exam Prep",
    slug: "education-specialist-exam-prep",
    description:
      "ชุดแนวข้อสอบสำหรับตำแหน่งนักวิชาการศึกษา ระดับปฏิบัติการ พร้อมเฉลยละเอียด ครอบคลุมหลักการและแนวคิดทางการศึกษา จิตวิทยาการศึกษา การวัดและประเมินผล และกฎหมายการศึกษา",
    shortDescription: "แนวข้อสอบนักวิชาการศึกษา ระดับปฏิบัติการ พร้อมเฉลยละเอียด",
    price: 320,
    originalPrice: 400,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติการ",
    tags: ["นักวิชาการศึกษา", "ปฏิบัติการ", "การศึกษา", "จิตวิทยา"],
    image: "/thai-education-exam-book-cover.jpg",
    images: ["/thai-education-exam-book-cover.jpg"],
    inStock: true,
    stockQuantity: 89,
    rating: 4.6,
    reviewCount: 89,
    features: ["หลักการและแนวคิดทางการศึกษา", "จิตวิทยาการศึกษา", "การวัดและประเมินผลการศึกษา", "กฎหมายและระเบียบการศึกษา"],
    specifications: [
      { key: "จำนวนหน้า", value: "380 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "รูปแบบ", value: "E-book เท่านั้น" },
    ],
    format: "digital",
    digitalAssets: [
      {
        id: "da3",
        name: "E-book นักวิชาการศึกษา",
        type: "pdf",
        url: "/downloads/education-specialist-ebook.pdf",
        size: "18 MB",
        downloadLimit: 5,
        expiryDays: 180,
        watermark: true,
      },
    ],
    onlineReader: true,
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    isOnSale: true,
    publisher: "SHEET88 Publishing",
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติการ",
    targetPosition: "นักวิชาการศึกษา",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "3",
    name: "แนวข้อสอบ เจ้าหน้าที่วิเคราะห์นโยบายและแผน",
    nameEn: "Policy Analysis Officer Exam Prep",
    slug: "policy-analysis-officer-exam",
    description:
      "แนวข้อสอบครบถ้วนสำหรับตำแหน่งเจ้าหน้าที่วิเคราะห์นโยบายและแผน ระดับปฏิบัติการ ครอบคลุมการวิเคราะห์นโยบายสาธารณะ การวางแผนเชิงกลยุทธ์ และการประเมินผลโครงการ",
    shortDescription: "แนวข้อสอบเจ้าหน้าที่วิเคราะห์นโยบายและแผน ระดับปฏิบัติการ",
    price: 420,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติการ",
    tags: ["วิเคราะห์นโยบาย", "แผนงาน", "ปฏิบัติการ", "นโยบายสาธารณะ"],
    image: "/thai-policy-analysis-exam-book.jpg",
    images: ["/thai-policy-analysis-exam-book.jpg"],
    inStock: true,
    stockQuantity: 75,
    rating: 4.7,
    reviewCount: 156,
    features: ["การวิเคราะห์นโยบายสาธารณะ", "การวางแผนเชิงกลยุทธ์", "การประเมินผลโครงการ", "สถิติและการวิจัยเชิงนโยบาย"],
    specifications: [
      { key: "จำนวนหน้า", value: "520 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "น้ำหนัก", value: "1.2 กก." },
      { key: "รูปแบบ", value: "หนังสือเล่มเท่านั้น" },
    ],
    format: "physical",
    weight: 1.2,
    dimensions: { length: 29.7, width: 21, height: 3.2 },
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    isOnSale: false,
    publisher: "SHEET88 Publishing",
    pages: 520,
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติการ",
    targetPosition: "เจ้าหน้าที่วิเคราะห์นโยบายและแผน",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-10-30"),
  },
  {
    id: "4",
    name: "แนวข้อสอบ นักทรัพยากรบุคคล ปฏิบัติการ",
    nameEn: "HR Specialist Exam Prep",
    slug: "hr-specialist-exam-prep",
    description:
      "ชุดแนวข้อสอบนักทรัพยากรบุคคล ระดับปฏิบัติการ พร้อมกรณีศึกษาและแบบฝึกหัด ครอบคลุมการบริหารทรัพยากรบุคคล กฎหมายแรงงาน และการพัฒนาบุคลากร",
    shortDescription: "แนวข้อสอบนักทรัพยากรบุคคล ระดับปฏิบัติการ พร้อมกรณีศึกษา",
    price: 350,
    originalPrice: 420,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติการ",
    tags: ["ทรัพยากรบุคคล", "HR", "ปฏิบัติการ", "กฎหมายแรงงาน"],
    image: "/thai-hr-exam-preparation-book.jpg",
    images: ["/thai-hr-exam-preparation-book.jpg"],
    inStock: true,
    stockQuantity: 120,
    rating: 4.5,
    reviewCount: 203,
    features: ["การบริหารทรัพยากรบุคคล", "กฎหมายแรงงานและข้าราชการ", "การพัฒนาบุคลากร", "การประเมินผลการปฏิบัติงาน"],
    specifications: [
      { key: "จำนวนหน้า", value: "420 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "รูปแบบ", value: "หนังสือ + E-book" },
    ],
    format: "bundle",
    digitalAssets: [
      {
        id: "da4",
        name: "E-book นักทรัพยากรบุคคล",
        type: "pdf",
        url: "/downloads/hr-specialist-ebook.pdf",
        size: "22 MB",
        downloadLimit: 3,
        expiryDays: 365,
        watermark: true,
      },
    ],
    weight: 0.9,
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    publisher: "SHEET88 Publishing",
    pages: 420,
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติการ",
    targetPosition: "นักทรัพยากรบุคคล",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-11-20"),
  },
  {
    id: "5",
    name: "แนวข้อสอบ นักวิชาการคอมพิวเตอร์",
    nameEn: "Computer Specialist Exam Prep",
    slug: "computer-specialist-exam-prep",
    description:
      "แนวข้อสอบสำหรับตำแหน่งนักวิชาการคอมพิวเตอร์ ครอบคลุมเทคโนโลยีสารสนเทศทุกด้าน รวมถึงระบบฐานข้อมูล เครือข่าย การพัฒนาซอฟต์แวร์ และความปลอดภัยไซเบอร์",
    shortDescription: "แนวข้อสอบนักวิชาการคอมพิวเตอร์ ครอบคลุมเทคโนโลยีสารสนเทศ",
    price: 480,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติการ",
    tags: ["คอมพิวเตอร์", "เทคโนโลยี", "IT", "ฐานข้อมูล"],
    image: "/thai-computer-science-exam-book.jpg",
    images: ["/thai-computer-science-exam-book.jpg"],
    inStock: false,
    stockQuantity: 0,
    rating: 4.9,
    reviewCount: 78,
    features: ["ระบบฐานข้อมูล", "เครือข่ายคอมพิวเตอร์", "การพัฒนาซอฟต์แวร์", "ความปลอดภัยทางไซเบอร์"],
    specifications: [
      { key: "จำนวนหน้า", value: "550 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "รูปแบบ", value: "E-book เท่านั้น" },
      { key: "สถานะ", value: "หมดสต็อก - เตรียมพิมพ์ใหม่" },
    ],
    format: "digital",
    digitalAssets: [
      {
        id: "da5",
        name: "E-book นักวิชาการคอมพิวเตอร์",
        type: "pdf",
        url: "/downloads/computer-specialist-ebook.pdf",
        size: "35 MB",
        downloadLimit: 5,
        expiryDays: 365,
        watermark: true,
      },
    ],
    onlineReader: true,
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    publisher: "SHEET88 Publishing",
    pages: 550,
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติการ",
    targetPosition: "นักวิชาการคอมพิวเตอร์",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "6",
    name: "แนวข้อสอบ นักวิชาการเงินและบัญชี",
    nameEn: "Finance & Accounting Specialist Exam",
    slug: "finance-accounting-specialist-exam",
    description:
      "ชุดแนวข้อสอบครบถ้วนสำหรับนักวิชาการเงินและบัญชี พร้อมตัวอย่างข้อสอบจริง ครอบคลุมหลักการบัญชี การวิเคราะห์งบการเงิน และกฎหมายการเงิน",
    shortDescription: "แนวข้อสอบนักวิชาการเงินและบัญชี พร้อมตัวอย่างข้อสอบจริง",
    price: 390,
    originalPrice: 460,
    category: "แนวข้อสอบ",
    subcategory: "ระดับปฏิบัติการ",
    tags: ["การเงิน", "บัญชี", "นักวิชาการ", "งบการเงิน"],
    image: "/thai-finance-accounting-exam-book.jpg",
    images: ["/thai-finance-accounting-exam-book.jpg"],
    inStock: true,
    stockQuantity: 95,
    rating: 4.4,
    reviewCount: 134,
    features: ["หลักการบัญชีและการเงิน", "การวิเคราะห์งบการเงิน", "การจัดทำงบประมาณ", "กฎหมายและระเบียบการเงิน"],
    specifications: [
      { key: "จำนวนหน้า", value: "480 หน้า" },
      { key: "ขนาด", value: "A4" },
      { key: "น้ำหนัก", value: "1.1 กก." },
      { key: "รูปแบบ", value: "หนังสือเล่มเท่านั้น" },
    ],
    format: "physical",
    weight: 1.1,
    dimensions: { length: 29.7, width: 21, height: 3.0 },
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    relatedProducts: ["1", "3"],
    publisher: "SHEET88 Publishing",
    pages: 480,
    language: "th",
    examType: "ข้าราชการ",
    examLevel: "ปฏิบัติการ",
    targetPosition: "นักวิชาการเงินและบัญชี",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-11-10"),
  },
]

export const categories = ["ทั้งหมด", "แนวข้อสอบ", "หนังสือเรียน", "คู่มือการสอบ", "แบบฝึกหัด", "หนังสือดิจิทัล", "วิดีโอสอน"]

export const subcategories = {
  แนวข้อสอบ: ["ระดับปฏิบัติงาน", "ระดับปฏิบัติการ", "ระดับชำนาญการ", "ระดับเชี่ยวชาญ", "ระดับอำนวยการ"],
  หนังสือเรียน: ["ภาษาไทย", "ภาษาอังกฤษ", "คณิตศาสตร์", "วิทยาศาสตร์", "สังคมศึกษา"],
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "ทั้งหมด") return products
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}

export function getBestsellerProducts(): Product[] {
  return products.filter((product) => product.isBestseller)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew)
}

export function getOnSaleProducts(): Product[] {
  return products.filter((product) => product.isOnSale)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId)
  if (!product?.relatedProducts) return []

  return products.filter((p) => product.relatedProducts?.includes(p.id))
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.nameEn.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      product.targetPosition?.toLowerCase().includes(searchTerm),
  )
}
