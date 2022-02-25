import { injectable } from 'inversify';
import { Storage } from './storage';

@injectable()
export class BrowserLocalStorage implements Storage<string, never> {
	getItem(key: string): never | null {
		const value = localStorage.getItem(key);

		return value ? JSON.parse(value) : null;
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	setItem(key: string, value: never): void {
		const serializedValue = JSON.stringify(value);

		localStorage.setItem(key, serializedValue);
	}

	clear(): void {
		localStorage.clear();
	}
}
