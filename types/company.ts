export interface CompanyData {
  company: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  employees: number;
  revenue: number;
  website: string;
  sales_rep: string;
  last_contacted: string;
  purchased: boolean;
  notes: string;
}

export interface ApiResponse {
  status: string;
  code: number;
  total: number;
  data: CompanyData[];
}
