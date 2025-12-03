---
title: 'Craft Beer 101: Understanding Your Local Brewery Scene'
description: 'An introduction to the craft beer revolution and how to explore breweries near you using Open Brewery DB'
author: 'Beer Explorer'
date: '2024-11-15'
tags: ['craft beer', 'beginner', 'local breweries']
featuredImage:
  {
    image: '../../images/blog/post-1.jpg',
    description: 'An image for the post about craft beer.',
  }
---

# Craft Beer 101: Understanding Your Local Brewery Scene

The craft beer revolution has transformed the way we think about and enjoy beer. What started as a niche movement has become a global phenomenon, with thousands of breweries offering unique, flavorful alternatives to mass-produced beers.

## What Makes a Beer "Craft"?

According to the Brewers Association, a craft brewery is:

- **Small:** Produces 6 million barrels of beer or less annually
- **Independent:** Less than 25% owned by an alcohol industry member that isn't a craft brewer
- **Traditional:** Makes beer with traditional or innovative ingredients

## Exploring Your Local Options

One of the best ways to dive into craft beer is by exploring local breweries. Using [Open Brewery DB](https://www.openbrewerydb.org/), I've been discovering amazing local spots. Here are some of my recent favorites:

### API Example: Finding Local Breweries

```javascript
// Example API call to find breweries in a specific city
const response = await fetch(
  'https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3',
)
const breweries = await response.json()
```
