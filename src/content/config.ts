import { defineCollection, z } from "astro:content";

const signSchema = z.object({
  sign: z.enum([
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ]),
  type: z.enum(["sun", "moon", "ascendant"]),
  label: z.string(),
});

export const collections = {
  "sun-signs":  defineCollection({ schema: signSchema }),
  "moon-signs": defineCollection({ schema: signSchema }),
  "ascendants": defineCollection({ schema: signSchema }),
};
