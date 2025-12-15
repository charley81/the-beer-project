---
id: '2'
title: "Brewing Through Time: America's Oldest Operating Breweries"
description: "A historical journey through some of America's longest-running breweries and their stories"
author: 'History Hops'
date: '2024-11-22'
tags: ['history', 'traditional brewing', 'american breweries']
featuredImage:
  {
    image: '../../images/blog/post-2.jpg',
    description: 'An image for the post about craft beer.',
  }
---

# Brewing Through Time: America's Oldest Operating Breweries

Beer has been part of American culture since before the nation's founding. Some breweries have survived prohibition, wars, and changing tastes to continue brewing today.

## The Pre-Prohibition Survivors

These breweries operated before the 1920s and managed to survive the 13-year drought of Prohibition:

### 1. Yuengling (Pottsville, PA - Est. 1829)

**America's Oldest Brewery**

- Family-owned for six generations
- Survived Prohibition by making ice cream
- Still produces their famous Traditional Lager

### 2. Anheuser-Busch (St. Louis, MO - Est. 1852)

**The King of Beers' Home**

- Founded by German immigrants
- Pioneered refrigeration and pasteurization in brewing
- Their St. Louis brewery is a National Historic Landmark

## How I Track Historical Breweries

Using Open Brewery DB's API, I created a timeline of breweries by their established date:

```javascript
// Filtering breweries by establishment year
const historicalBreweries = await fetch(
  'https://api.openbrewerydb.org/breweries?by_dist=38.8977,77.0365&per_page=50',
)
  .then((res) => res.json())
  .then((data) =>
    data.filter((brewery) => {
      // Assuming some breweries have 'established' field
      return brewery.established && brewery.established < 1920
    }),
  )
```
