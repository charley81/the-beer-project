import type { Brewery } from '@/lib/api/brewery'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { MapPin, Globe, Phone } from 'lucide-react'

interface BreweryCardProps {
  brewery: Brewery
}

export function BreweryCard({ brewery }: BreweryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{brewery.name}</CardTitle>
        <Badge>{brewery.brewery_type.replace('_', ' ')}</Badge>
        <CardDescription>
          <MapPin size={14} className="text-muted-foreground" />
          {brewery.city}, {brewery.state_province || brewery.state}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>{brewery.address_1}</p>
          <p>
            {brewery.city}, {brewery.state_province || brewery.state}{' '}
            {brewery.postal_code}
          </p>
        </div>
        <div>
          {brewery.phone && (
            <div>
              <Phone />
              <span>{brewery.phone}</span>
            </div>
          )}
          {brewery.website_url && (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe />
              <span>Website</span>
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <a href={`/brewery/${brewery.id}`}>View Full Details</a>
      </CardFooter>
    </Card>
  )
}
