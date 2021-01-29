import {IterationOf} from '../Iteration/IterationOf'
import {Iteration} from '../Iteration/Iteration'
import {Pos} from '../Iteration/Pos'
import {Prev} from '../Iteration/Prev'
import {Next} from '../Iteration/Next'
import {_IsNegative} from './IsNegative'
import {Cast} from '../Any/Cast'

/**
 * @hidden
 */
type _AddPositive<N1 extends Iteration, N2 extends Iteration> = {
    0: _AddPositive<Next<N1>, Prev<N2>> // N1 = -/+, N2 = +
    1: N1
    2: IterationOf<number>
}[
    Pos<N2> extends 0        // If successful
    ? 1
    : number extends Pos<N2> // If un-success
      ? 2
      : 0                    // Or continue
]

/**
 * @hidden
 */
type AddPositive<N1 extends Iteration, N2 extends Iteration> =
    _AddPositive<N1, N2> extends infer X
    ? Cast<X, Iteration>
    : never

/**
 * @hidden
 */
type _AddNegative<N1 extends Iteration, N2 extends Iteration> = {
    0: _AddNegative<Prev<N1>, Next<N2>> // N1 = -/+, N2 = -
    1: N1
    2: number
}[
    Pos<N2> extends 0        // If successful
    ? 1
    : number extends Pos<N2> // If un-success
      ? 2
      : 0                    // Or continue
]

/**
 * @hidden
 */
type AddNegative<N1 extends Iteration, N2 extends Iteration> =
    _AddNegative<N1, N2> extends infer X
    ? Cast<X, Iteration>
    : never

/**
 * @hidden
 */
export type _Add<N1 extends Iteration, N2 extends Iteration> = {
    0: AddPositive<N1, N2>
    1: AddNegative<N1, N2>
}[_IsNegative<N2>]

/**
 * @hidden
 */
export type __Add<N1 extends number, N2 extends number> =
    _Add<IterationOf<N1>, IterationOf<N2>>

/**
 * Add a [[Number]] to another one
 * @param N1 Left-hand side
 * @param N2 Right-hand side
 * @param fmt (?=`'s'`) output format
 * @param IMap to operate with another set of numbers
 * @returns `string | number | boolean`
 * @example
 * ```ts
 * import {N} from 'ts-toolbelt'
 *
 * type test0 = N.Add<'2', '10'>        // '12'
 * type test1 = N.Add<'0', '40'>        // '40'
 * type test2 = N.Add<'0', '40', 's'>   // '40'
 * type test3 = N.Add<'0', '40', 'n'>   //  40
 * type test4 = N.Add<'-20', '40', 's'> // '20'
 * type test5 = N.Add<'-20', '40', 'n'> //  20
 * ```
 */
export type Add<N1 extends number, N2 extends number> =
    N1 extends unknown
    ? N2 extends unknown
    ? __Add<N1, N2>[0]
    : never
    : never
