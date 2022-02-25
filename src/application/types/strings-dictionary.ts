export type StringsDictionary<T> = { [P in keyof Partial<T>]: string };
