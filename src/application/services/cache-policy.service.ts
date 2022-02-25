import { Either, isRight, right } from 'fp-ts/lib/Either';
import { ECachePolicyType } from '../enums/e-cache-policy-type';
import { CacheEntry } from '../value-objects/cache/cache-entry';
import { BrowserLocalStorage } from './storage/browser-local-storage';
import { Storage } from './storage/storage';

export class CachePolicyService {
	constructor(private readonly _dataStorage: Storage<string, CacheEntry<never>> = new BrowserLocalStorage()) {}

	async execute<TError, TSuccess>(
		cacheKey: string,
		asyncFn: () => Promise<Either<TError, TSuccess>>,
		cachePolicy?: ECachePolicyType,
	): Promise<Either<TError, TSuccess>> {
		if (cachePolicy === ECachePolicyType.Always) {
			const cachedEntry = this._dataStorage.getItem(cacheKey);

			return cachedEntry ? right(cachedEntry.value) : this._fetchAndCache(cacheKey, asyncFn);
		}

		return await asyncFn();
	}

	private async _fetchAndCache<TError, TSuccess>(
		cacheKey: string,
		asyncFn: () => Promise<Either<TError, TSuccess>>,
	): Promise<Either<TError, TSuccess>> {
		const result = await asyncFn();

		if (isRight(result)) {
			this._dataStorage.setItem(cacheKey, new CacheEntry(result.right as never));
		}

		return result;
	}
}
