import { news } from './news'
import { newsCategory } from './newsCategory'
import { product } from './product'
import { subsystem } from './subsystem'
import { partner } from './partner'
import { teamMember } from './teamMember'
import { localizedString, localizedText, localizedRichText } from './objects/localized'

export const schemaTypes = [
  // Documents
  news,
  newsCategory,
  product,
  subsystem,
  partner,
  teamMember,
  // Objects
  localizedString,
  localizedText,
  localizedRichText,
]
