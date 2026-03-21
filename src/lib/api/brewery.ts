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
  page = 1,
  perPage = 10,
): Promise<Brewery[]> {
  const params = new URLSearchParams({
    by_city: city,
    page: page.toString(),
    per_page: perPage.toString(),
  })
  const response = await fetch(`${BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch breweries: ${response.statusText}`)
  }

  const data = (await response.json()) as Brewery[]
  return data
}

export async function getBreweryById(id: string): Promise<Brewery> {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error(`Brewery with ID ${id} not found.`)
  }

  const data = (await response.json()) as Brewery
  return data
}
