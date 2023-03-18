export type SnakeCase<T> = {
  [K in keyof T as ToSnakeCase<K & string>]: T[K]
}

type ToSnakeCase<S extends string> =
S extends `${infer Head}${infer Tail}`
  ? `${Head extends Uppercase<Head> ? '_' : ''}${Lowercase<Head>}${ToSnakeCase<Tail>}`
  : S
