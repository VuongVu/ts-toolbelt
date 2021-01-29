import {Depth} from '../Object/_Internal'
import {WritablePart} from '../Object/Writable'
import {List} from './List'
import {Cast} from '../Any/Cast'

/**
 * Make `L` writable (deeply or not)
 * @param L to make writable
 * @param depth (?=`'flat'`) to do it deeply
 * @returns [[List]]
 * @example
 * ```ts
 * ```
 */
export type Writable<L extends List, depth extends Depth = 'flat'> =
    Cast<WritablePart<L, depth>, List>
