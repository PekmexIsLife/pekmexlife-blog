import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import { articleSchema } from './article'
import { refugioSchema } from './refugio'
import { historiaAdopcionSchema } from './historiaAdopcion'
import { recomendacionSchema } from './recomendacion'

export const schemaTypes = [post, author, category, blockContent, articleSchema, refugioSchema, historiaAdopcionSchema, recomendacionSchema]
