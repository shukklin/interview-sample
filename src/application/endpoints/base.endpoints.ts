import { injectable } from 'inversify';

@injectable()
export abstract class BaseEndpoints {
	public readonly apiUrl = '/api';
	public readonly apiVersion = '/v1';

	protected buildApiUrl(url: string): string {
		return `${this.apiUrl}${this.apiVersion}${url}`;
	}
}
