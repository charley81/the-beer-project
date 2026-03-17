import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { getBreweriesByCity } from "@/lib/api/brewery"

export const server = {
  search: defineAction({
    accept: "form",
    input: z.object({
      city: z.string().min(2, "Please enter at least 2 characters."),
    }),
    handler: async (input) => {
      const breweries = await getBreweriesByCity(input.city)
      return breweries
    },
  }),
}
