/**
 * Utility functions for handling URL generation with parameters
 */

/**
 * Creates a URL with guest name parameters
 * 
 * @param baseUrl - The base URL (e.g., '/en')
 * @param guests - A single guest name or array of guest names
 * @returns The URL with guest parameters
 */
export function createGuestUrl(baseUrl: string, guests: string | string[]): string {
  const url = new URL(baseUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  
  if (Array.isArray(guests)) {
    // Handle multiple guests
    guests.forEach(guest => {
      url.searchParams.append('guests', guest);
    });
  } else if (guests) {
    // Handle single guest
    url.searchParams.set('guests', guests);
  }
  
  return url.pathname + url.search;
}

/**
 * Extracts guest names from search parameters
 * 
 * @param searchParams - The search parameters object
 * @returns A formatted string of guest names or undefined if no guests
 */
export function extractGuestNames(searchParams: { guests?: string | string[] }): string | undefined {
  if (!searchParams.guests) return undefined;
  
  if (Array.isArray(searchParams.guests)) {
    // If multiple guests are provided, join them with commas
    return searchParams.guests.join(", ");
  } else {
    // If a single guest is provided
    return searchParams.guests;
  }
}