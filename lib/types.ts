export interface Program {
  id: string
  name: string
  duration: string
  modality: "online" | "presencial" | "híbrida"
  nextCohort: string
  description: string
  curriculum: string[]
  outcomes: string[]
  price?: string // Added price field for ULINEA programs
}

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  interestProgram: string
  message: string
  acceptsTerms: boolean
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  referrer?: string
  path?: string
}

export interface Testimonial {
  id: string
  name: string
  program: string
  cohort: string
  quote: string
  image: string
  role?: string
  company?: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}
