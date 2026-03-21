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
import { MapPin, Globe, Phone, ExternalLink } from 'lucide-react'
import { FavoriteButton } from './favorite-button'

interface BreweryCardProps {
  brewery: Brewery
  isFavorited?: boolean
}

export function BreweryCard({ brewery, isFavorited = false }: BreweryCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all hover:shadow-md relative">
      <div className="absolute top-3 right-3 z-20">
        <FavoriteButton
          breweryId={brewery.id}
          initialIsFavorited={isFavorited}
        />
      </div>

      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold leading-tight">
            {brewery.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 capitalize">
            {brewery.brewery_type.replace('_', ' ')}
          </Badge>
        </div>

        <CardDescription className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin size={14} className="text-primary shrink-0" />
          {brewery.city}, {brewery.state_province || brewery.state}
        </CardDescription>
      </CardHeader>

      <CardContent className="grow space-y-4">
        <div className="text-muted-foreground space-y-0.5 text-sm">
          <p>{brewery.address_1}</p>
          <p>
            {brewery.city}, {brewery.state_province || brewery.state}{' '}
            {brewery.postal_code}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
          {brewery.phone && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Phone size={14} className="text-primary" />
              <span>{brewery.phone}</span>
            </div>
          )}
          {brewery.website_url && (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <Globe size={14} className="text-primary" />
              <span>Website</span>
              <ExternalLink size={12} className="opacity-50" />
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <a
          href={`/brewery/${brewery.id}`}
          className={buttonVariants({
            variant: 'outline',
            className: 'w-full font-bold',
          })}
        >
          View Full Details
        </a>
      </CardFooter>
    </Card>
  )
}
