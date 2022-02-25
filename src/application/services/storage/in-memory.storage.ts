import { injectable } from 'inversify';
import { observable } from 'mobx';
import { Storage } from './storage';

@injectable()
export class InMemoryStorage implements Storage<string, never | undefined> {
	@observable protected readonly _cache: Map<string, never | undefined> = new Map();

	getItem(key: string): undefined | never {
		return this._cache.get(key);
	}

	removeItem(key: string): void {
		this._cache.delete(key);
	}

	setItem(key: string, value: never): void {
		this._cache.set(key, value);
	}

	clear(): void {
		this._cache.clear();
	}
}
