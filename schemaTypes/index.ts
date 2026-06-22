import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import { articleSchema } from './article'
import { refugioSchema } from './refugio'
import { historiaAdopcionSchema } from './historiaAdopcion'
import { recomendacionSchema } from './recomendacion'
import { productSchema } from './product'
import { productLandingSchema } from './productLanding'
import { shopFaqSchema } from './shopFaq'
import { shopHeroSchema } from './shopHero'
import { freebieSchema } from './freebie'

export const schemaTypes = [
  post, author, category, blockContent,
  articleSchema, refugioSchema, historiaAdopcionSchema,
  recomendacionSchema,
  productSchema, productLandingSchema, shopFaqSchema, shopHeroSchema,
  freebieSchema,
]
