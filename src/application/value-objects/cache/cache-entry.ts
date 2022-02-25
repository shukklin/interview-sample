export class CacheEntry<T> {
	constructor(public value: T, public createdAt: Date = new Date()) {}
}
