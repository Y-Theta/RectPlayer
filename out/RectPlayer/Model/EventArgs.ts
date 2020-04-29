/**
 * 拥有入参的委托类型
 * @param T 入参类型
 */
type Action<T> = (obj: T) => void;

type ActionD<T, U> = (obj1: T, obj2?: U) => void;

type ActionT<T, U, V> = (obj1: T, obj2?: U, obj3?: V) => void;

/**
 * 有入参和返回值的委托类型
 * @param T 入参类型
 * @param R 返回类型
 */
type Func<T, R> = (input: T) => R;

type FuncD<T, U, R> = (input: T, input1?: U) => R;

type FuncT<T, U, V, R> = (input: T, input1?: U, input2?: V) => R;

export { Func, FuncD, FuncT };
export { Action, ActionD, ActionT };
