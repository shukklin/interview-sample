import { injectable } from 'inversify';
import { HttpClient } from '../modules/http/http-client';

@injectable()
export abstract class RemoteRepository<TEndpoints> {
	protected abstract readonly _endpoints: TEndpoints;
	protected abstract readonly _httpClient: HttpClient;
}
