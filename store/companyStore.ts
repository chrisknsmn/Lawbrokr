import { create } from 'zustand';
import { CompanyData } from '@/types/company';
import { findMatchingEntryIndex } from '@/lib/utils/matchingAlgorithm';

interface CompanyState {
  companies: CompanyData[];
  isLoading: boolean;
  error: string | null;
  setCompanies: (companies: CompanyData[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addOrUpdateCompany: (company: CompanyData) => { wasUpdated: boolean; index: number };
  updateCompany: (index: number, company: CompanyData) => void;
  resetCompanies: () => void;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  isLoading: false,
  error: null,
  setCompanies: (companies) => set({ companies, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  /**
   * Add or update a company entry using the 5-field matching algorithm
   * If 5+ fields match an existing entry, update it; otherwise add new
   */
  addOrUpdateCompany: (company) => {
    const state = get();
    const matchIndex = findMatchingEntryIndex(company, state.companies);

    if (matchIndex !== -1) {
      // Update existing entry
      const newCompanies = [...state.companies];
      newCompanies[matchIndex] = company;
      set({ companies: newCompanies });
      return { wasUpdated: true, index: matchIndex };
    } else {
      // Add new entry
      set({ companies: [...state.companies, company] });
      return { wasUpdated: false, index: state.companies.length };
    }
  },

  updateCompany: (index, company) =>
    set((state) => {
      const newCompanies = [...state.companies];
      newCompanies[index] = company;
      return { companies: newCompanies };
    }),
  resetCompanies: () => set({ companies: [], error: null }),
}));
