import { companyFormSchema } from '@/lib/validations/companySchema';

describe('Company Form Validation Schema', () => {
  const validData = {
    company: 'Test Company',
    country: 'USA',
    state: 'California',
    city: 'San Francisco',
    zipcode: '94105',
    employees: 50,
    revenue: 1000000,
    website: 'https://example.com',
    sales_rep: 'John Doe',
    last_contacted: '2024-01-15',
    purchased: true,
    notes: 'Some notes',
  };

  describe('Required Fields Validation', () => {
    it('should validate a complete valid entry', () => {
      const result = companyFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should allow empty notes (optional field)', () => {
      const data = { ...validData, notes: '' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail when company name is missing', () => {
      const data = { ...validData, company: '' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('required');
      }
    });

    it('should fail when required fields are missing', () => {
      const data = { ...validData, country: '', state: '', city: '' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe('Zipcode Validation', () => {
    it('should accept valid 5-digit zipcode', () => {
      const data = { ...validData, zipcode: '12345' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept valid 9-digit zipcode with hyphen', () => {
      const data = { ...validData, zipcode: '12345-6789' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject zipcode with letters', () => {
      const data = { ...validData, zipcode: 'ABC12' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid US zipcode');
      }
    });

    it('should reject zipcode with wrong format', () => {
      const data = { ...validData, zipcode: '123' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should reject zipcode with incorrect hyphen position', () => {
      const data = { ...validData, zipcode: '123-456789' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('Number Field Validation', () => {
    it('should accept positive integers for employees', () => {
      const data = { ...validData, employees: 100 };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject negative employees', () => {
      const data = { ...validData, employees: -5 };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('positive');
      }
    });

    it('should reject zero employees', () => {
      const data = { ...validData, employees: 0 };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should accept positive revenue', () => {
      const data = { ...validData, revenue: 5000000 };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject negative revenue', () => {
      const data = { ...validData, revenue: -100 };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('positive');
      }
    });

    it('should coerce string numbers to numbers', () => {
      const data = { ...validData, employees: '75' as any, revenue: '500000' as any };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(typeof result.data.employees).toBe('number');
        expect(typeof result.data.revenue).toBe('number');
        expect(result.data.employees).toBe(75);
        expect(result.data.revenue).toBe(500000);
      }
    });
  });

  describe('Website URL Validation', () => {
    it('should accept valid https URL', () => {
      const data = { ...validData, website: 'https://example.com' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept valid http URL', () => {
      const data = { ...validData, website: 'http://example.com' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject invalid URL format', () => {
      const data = { ...validData, website: 'not-a-url' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid URL');
      }
    });

    it('should reject URL without protocol', () => {
      const data = { ...validData, website: 'example.com' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('Boolean Field Validation', () => {
    it('should accept true for purchased', () => {
      const data = { ...validData, purchased: true };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.purchased).toBe(true);
      }
    });

    it('should accept false for purchased', () => {
      const data = { ...validData, purchased: false };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.purchased).toBe(false);
      }
    });
  });

  describe('Date Field Validation', () => {
    it('should accept valid date string', () => {
      const data = { ...validData, last_contacted: '2024-12-03' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty date', () => {
      const data = { ...validData, last_contacted: '' };
      const result = companyFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('required');
      }
    });
  });
});
