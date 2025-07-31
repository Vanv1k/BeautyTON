import { z } from 'zod';

/** Схема мастера на главной */
// export const masterPreviewSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   nickname: z.string(),
//   specialty: z.string(),
//   avatar: z.string(),
//   rating: z.number(),
//   reviews: z.number(),
//   city: z.string(),
//   country: z.string(),
//   priceFrom: z.number(),
//   isPromo: z.boolean().optional(),
//   isFavorite: z.boolean().optional(),
//   lookingForModels: z.boolean().optional(),
//   description: z.string().optional(),
// });

export const masterPreviewSchema = z
  .object({
    ID: z.string(),
    Rating: z.number(),
    Bio: z.string(),
  })
  .transform(({ ID, Rating, Bio }) => ({
    id: ID,
    name: 'Sofia Mikhailova',
    nickname: 'SofiaStyle',
    specialty: 'Makeup Artist',
    avatar:
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: Rating,
    reviews: 120,
    city: 'Moscow',
    country: 'Russia',
    priceFrom: 2500,
    isPromo: false,
    isFavorite: false,
    lookingForModels: true,
    description: Bio,
  }));

export type MasterPreviewEntityApi = z.input<typeof masterPreviewSchema>;

export type MasterPreviewEntity = z.infer<typeof masterPreviewSchema>;
