import { create } from 'zustand';
import { CompanyData } from '@/types/company';

interface CompanyState {
  companies: CompanyData[];
  isLoading: boolean;
  error: string | null;
  setCompanies: (companies: CompanyData[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addCompany: (company: CompanyData) => void;
  updateCompany: (index: number, company: CompanyData) => void;
  resetCompanies: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  isLoading: false,
  error: null,
  setCompanies: (companies) => set({ companies, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompany: (index, company) =>
    set((state) => {
      const newCompanies = [...state.companies];
      newCompanies[index] = company;
      return { companies: newCompanies };
    }),
  resetCompanies: () => set({ companies: [], error: null }),
}));
