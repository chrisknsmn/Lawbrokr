import { findMatchingEntryIndex, countMatchingFields } from '@/lib/utils/matchingAlgorithm';
import { CompanyData } from '@/types/company';

describe('5-Field Matching Algorithm', () => {
  const existingEntries: CompanyData[] = [
    {
      company: 'Lakin-Rosenbaum',
      country: 'French Polynesia',
      state: 'Kentucky',
      city: 'Louisville',
      zipcode: '63665-7148',
      employees: 6,
      revenue: 5709368,
      website: 'larson.com',
      sales_rep: 'Nina',
      last_contacted: '1998-11-18',
      purchased: true,
      notes: 'Original entry',
    },
    {
      company: 'Tech Corp',
      country: 'USA',
      state: 'California',
      city: 'San Francisco',
      zipcode: '94105',
      employees: 50,
      revenue: 1000000,
      website: 'techcorp.com',
      sales_rep: 'John',
      last_contacted: '2023-01-15',
      purchased: false,
      notes: 'Another company',
    },
  ];

  describe('findMatchingEntryIndex', () => {
    it('should return index when exactly 5 fields match', () => {
      const newEntry: CompanyData = {
        company: 'Lakin-Rosenbaum', // match
        country: 'French Polynesia', // match
        state: 'Kentucky', // match
        city: 'Louisville', // match
        zipcode: '63665-7148', // match
        employees: 999, // different
        revenue: 999999, // different
        website: 'different.com', // different
        sales_rep: 'Different Rep', // different
        last_contacted: '2024-01-01', // excluded from matching
        purchased: false, // different
        notes: 'Different notes', // excluded from matching
      };

      const result = findMatchingEntryIndex(newEntry, existingEntries);
      expect(result).toBe(0); // Should match the first entry
    });

    it('should return index when more than 5 fields match', () => {
      const newEntry: CompanyData = {
        company: 'Lakin-Rosenbaum', // match
        country: 'French Polynesia', // match
        state: 'Kentucky', // match
        city: 'Louisville', // match
        zipcode: '63665-7148', // match
        employees: 6, // match
        revenue: 5709368, // match
        website: 'larson.com', // match
        sales_rep: 'Different Rep', // different
        last_contacted: '2024-01-01', // excluded
        purchased: true, // match
        notes: 'Different notes', // excluded
      };

      const result = findMatchingEntryIndex(newEntry, existingEntries);
      expect(result).toBe(0); // Should match the first entry (9 fields match)
    });

    it('should return -1 when less than 5 fields match', () => {
      const newEntry: CompanyData = {
        company: 'Lakin-Rosenbaum', // match
        country: 'French Polynesia', // match
        state: 'Kentucky', // match
        city: 'Louisville', // match
        zipcode: 'DIFFERENT', // different
        employees: 999, // different
        revenue: 999999, // different
        website: 'different.com', // different
        sales_rep: 'Different Rep', // different
        last_contacted: '2024-01-01', // excluded
        purchased: false, // different
        notes: 'Different notes', // excluded
      };

      const result = findMatchingEntryIndex(newEntry, existingEntries);
      expect(result).toBe(-1); // Should not match (only 4 fields match)
    });

    it('should return -1 when no fields match', () => {
      const newEntry: CompanyData = {
        company: 'Completely Different',
        country: 'Germany',
        state: 'Bavaria',
        city: 'Munich',
        zipcode: '80331',
        employees: 100,
        revenue: 5000000,
        website: 'example.de',
        sales_rep: 'Hans',
        last_contacted: '2024-01-01',
        purchased: false,
        notes: 'No match',
      };

      const result = findMatchingEntryIndex(newEntry, existingEntries);
      expect(result).toBe(-1);
    });

    it('should exclude last_contacted and notes from matching', () => {
      const newEntry: CompanyData = {
        company: 'Lakin-Rosenbaum', // match
        country: 'French Polynesia', // match
        state: 'Kentucky', // match
        city: 'Louisville', // match
        zipcode: '63665-7148', // match
        employees: 999, // different
        revenue: 999999, // different
        website: 'different.com', // different
        sales_rep: 'Different Rep', // different
        last_contacted: 'COMPLETELY DIFFERENT DATE', // should be excluded
        purchased: false, // different
        notes: 'COMPLETELY DIFFERENT NOTES', // should be excluded
      };

      // Even with different last_contacted and notes, should still match based on 5 other fields
      const result = findMatchingEntryIndex(newEntry, existingEntries);
      expect(result).toBe(0);
    });

    it('should return the index of the first matching entry', () => {
      const duplicateEntries: CompanyData[] = [
        ...existingEntries,
        {
          ...existingEntries[0],
          notes: 'Duplicate entry',
        },
      ];

      const newEntry: CompanyData = { ...existingEntries[0] };
      const result = findMatchingEntryIndex(newEntry, duplicateEntries);
      expect(result).toBe(0); // Should return first match, not the duplicate at index 2
    });
  });

  describe('countMatchingFields', () => {
    it('should count all matching fields correctly', () => {
      const entry1: CompanyData = { ...existingEntries[0] };
      const entry2: CompanyData = { ...existingEntries[0] };

      const count = countMatchingFields(entry1, entry2);
      expect(count).toBe(10); // All 10 matchable fields should match
    });

    it('should count partial matches correctly', () => {
      const entry1: CompanyData = { ...existingEntries[0] };
      const entry2: CompanyData = {
        ...existingEntries[0],
        company: 'Different',
        revenue: 999999,
        employees: 999,
      };

      const count = countMatchingFields(entry1, entry2);
      expect(count).toBe(7); // 10 - 3 differences = 7 matches
    });

    it('should not count last_contacted or notes', () => {
      const entry1: CompanyData = { ...existingEntries[0] };
      const entry2: CompanyData = {
        ...existingEntries[0],
        last_contacted: 'DIFFERENT',
        notes: 'DIFFERENT',
      };

      const count = countMatchingFields(entry1, entry2);
      expect(count).toBe(10); // Should still be 10 since last_contacted and notes are excluded
    });
  });
});
