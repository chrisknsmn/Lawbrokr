import { z } from 'zod';

// US Zipcode validation regex (supports both 5-digit and 9-digit formats)
const zipcodeRegex = /^\d{5}(-\d{4})?$/;

export const companyFormSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zipcode: z.string().regex(zipcodeRegex, 'Invalid US zipcode format (e.g., 12345 or 12345-6789)'),
  employees: z.coerce.number().int().positive('Employees must be a positive number'),
  revenue: z.coerce.number().positive('Revenue must be a positive number'),
  website: z.string().url('Invalid URL format'),
  sales_rep: z.string().min(1, 'Sales representative name is required'),
  last_contacted: z.string().min(1, 'Last contacted date is required'),
  purchased: z.boolean(),
  notes: z.string().optional().default(''),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
