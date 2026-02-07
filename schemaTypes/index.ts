import { news } from './news'
import { product } from './product'
import { partner } from './partner'
import { teamMember } from './teamMember'
import { localizedString, localizedText, localizedRichText } from './objects/localized'

export const schemaTypes = [
  // Documents
  news,
  product,
  partner,
  teamMember,
  // Objects
  localizedString,
  localizedText,
  localizedRichText,
]
