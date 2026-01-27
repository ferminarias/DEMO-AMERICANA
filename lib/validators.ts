import { z } from "zod"

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede exceder 80 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),

  email: z.string().email("Ingresa un email válido").max(100, "El email no puede exceder 100 caracteres"),

  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15, "El teléfono no puede exceder 15 dígitos")
    .regex(/^[\d\s\-+()]+$/, "Formato de teléfono inválido"),

  interestProgram: z.string().min(1, "Selecciona un programa de interés"),

  message: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, "El mensaje debe tener al menos 10 caracteres")
    .refine((val) => !val || val.length <= 1000, "El mensaje no puede exceder 1000 caracteres"),

  acceptsTerms: z.boolean().refine((val) => val === true, "Debes aceptar los términos y condiciones"),

  // UTM and tracking fields (optional)
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
  path: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
