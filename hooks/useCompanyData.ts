import { useEffect, useCallback } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { useLocalStorage } from './useLocalStorage';
import { CompanyData, ApiResponse } from '@/types/company';

const API_URL = 'https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text';
const STORAGE_KEY = 'company-data';

/**
 * Custom hook for managing company data with localStorage persistence
 * Fetches data from API on first load, then uses localStorage for subsequent loads
 */
export function useCompanyData() {
  const { companies, isLoading, error, setCompanies, setLoading, setError } = useCompanyStore();
  const [storedData, setStoredData, removeStoredData] = useLocalStorage<CompanyData[]>(STORAGE_KEY, []);

  // Fetch data from API
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid data format received from API');
      }

      // Store in both localStorage and state
      setStoredData(data.data);
      setCompanies(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching company data:', err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setStoredData, setCompanies]);

  // Reset data (clears localStorage and fetches fresh data)
  const resetData = useCallback(async () => {
    removeStoredData();
    await fetchCompanies();
  }, [removeStoredData, fetchCompanies]);

  // Load data on mount
  useEffect(() => {
    // If we have stored data, use it
    if (storedData && storedData.length > 0) {
      setCompanies(storedData);
    } else {
      // Otherwise, fetch from API
      fetchCompanies();
    }
  }, []); // Only run on mount

  // Sync companies to localStorage whenever they change
  useEffect(() => {
    if (companies.length > 0) {
      setStoredData(companies);
    }
  }, [companies, setStoredData]);

  return {
    companies,
    isLoading,
    error,
    resetData,
  };
}
