export interface Storage<TKey, TValue> {
	setItem(key: TKey, value: TValue): void;
	getItem(key: TKey): TValue | null;
	removeItem(key: TKey): void;
	clear(): void;
}
