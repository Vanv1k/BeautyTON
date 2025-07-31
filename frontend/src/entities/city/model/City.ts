import { z } from 'zod';

export const citySchema = z
  .object({
    ID: z.string(),
    Name: z.string(),
    CountryID: z.string(),
  })
  .transform((data) => ({
    id: data.ID,
    name: data.Name,
    countryId: data.CountryID,
  }));

export type CityEntityApi = z.input<typeof citySchema>;

export type CityEntity = z.infer<typeof citySchema>;
