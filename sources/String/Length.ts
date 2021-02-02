import {Split} from './Split'
import {Length as LLength} from '../List/Length'

/**
 * Get the length of a `string`
 * @param S
 */
export type Length<S extends string> =
    LLength<Split<S, ''>>
