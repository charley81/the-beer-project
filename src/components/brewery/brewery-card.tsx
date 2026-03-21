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
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative border-border/40 bg-card/50 backdrop-blur-xs">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary/40 via-primary to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-4 right-4 z-20">
        <FavoriteButton
          breweryId={brewery.id}
          initialIsFavorited={isFavorited}
          className="shadow-md"
        />
      </div>

      <CardHeader className="space-y-3 pb-4 pt-6">
        <div className="flex items-start justify-between gap-10">
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {brewery.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 capitalize bg-secondary/80 text-[10px] font-black tracking-widest px-2.5 py-1">
            {brewery.brewery_type.replace('_', ' ')}
          </Badge>
        </div>

        <CardDescription className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground/80">
          <MapPin size={14} className="text-primary shrink-0" />
          {brewery.city}, {brewery.state_province || brewery.state}
        </CardDescription>
      </CardHeader>

      <CardContent className="grow space-y-6">
        <div className="text-muted-foreground/90 space-y-1 text-sm leading-relaxed">
          <p className="font-medium">{brewery.address_1}</p>
          <p>
            {brewery.city}, {brewery.state_province || brewery.state}{' '}
            {brewery.postal_code}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2 border-t border-border/40">
          {brewery.phone && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              <Phone size={14} className="text-primary/70" />
              <span>{brewery.phone}</span>
            </div>
          )}
          {brewery.website_url && (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-all"
            >
              <Globe size={14} className="text-primary/70" />
              <span>Website</span>
              <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <a
          href={`/brewery/${brewery.id}`}
          className={buttonVariants({
            variant: 'outline',
            className: 'w-full font-black uppercase tracking-widest text-[10px] h-11 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-primary/20',
          })}
        >
          View Full Details
        </a>
      </CardFooter>
    </Card>
  )
}
