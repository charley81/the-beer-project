export interface Brewery {
  id: string
  name: string
  brewery_type: string
  address_1: string
  city: string
  state_province: string
  postal_code: string
  country: string
  longitude: string
  latitude: string
  phone: string
  website_url: string
  state: string
  street: string
}

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries'

export async function getBreweriesByCity(
  city: string,
  perPage = 5,
): Promise<Brewery[]> {
  const res = await fetch(`${BASE_URL}?by_city=${city}&per_page=${perPage}`)

  if (!res.ok) {
    throw new Error('Failed to fetch breweries')
  }

  return res.json()
}
