export type BreweryType =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed'

export interface Brewery {
  id: string
  name: string
  brewery_type: BreweryType
  address_1?: string | null
  address_2?: string | null
  address_3?: string | null
  city: string
  state_province?: string
  postal_code: string
  country: string
  longitude?: number | null
  latitude?: number | null
  phone?: string | null
  website_url?: string | null
  state?: string | null
  street?: string | null
}
