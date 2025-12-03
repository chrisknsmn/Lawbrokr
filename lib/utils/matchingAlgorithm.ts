import { CompanyData } from '@/types/company';

/**
 * Fields to compare for matching (excluding last_contacted and notes)
 */
const MATCHABLE_FIELDS: (keyof CompanyData)[] = [
  'company',
  'country',
  'state',
  'city',
  'zipcode',
  'employees',
  'revenue',
  'website',
  'sales_rep',
  'purchased',
];

/**
 * 5-Field Matching Algorithm
 *
 * Checks if any 5 fields (excluding last_contacted and notes) match between
 * the new entry and an existing entry. If a match is found, the existing entry
 * should be updated instead of adding a new one.
 *
 * @param newEntry - The new entry to check
 * @param existingEntries - Array of existing entries to check against
 * @returns The index of the matching entry, or -1 if no match found
 */
export function findMatchingEntryIndex(
  newEntry: CompanyData,
  existingEntries: CompanyData[]
): number {
  for (let i = 0; i < existingEntries.length; i++) {
    const existing = existingEntries[i];
    let matchCount = 0;

    // Count how many fields match
    for (const field of MATCHABLE_FIELDS) {
      if (newEntry[field] === existing[field]) {
        matchCount++;
      }
    }

    // If at least 5 fields match, return this entry's index
    if (matchCount >= 5) {
      return i;
    }
  }

  // No match found
  return -1;
}

/**
 * Helper function to check if a specific entry would match
 * (useful for debugging or testing)
 */
export function countMatchingFields(
  entry1: CompanyData,
  entry2: CompanyData
): number {
  let matchCount = 0;

  for (const field of MATCHABLE_FIELDS) {
    if (entry1[field] === entry2[field]) {
      matchCount++;
    }
  }

  return matchCount;
}
