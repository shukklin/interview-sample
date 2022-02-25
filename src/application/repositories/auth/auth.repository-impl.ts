import { Either, right } from 'fp-ts/Either';
import { AuthEndpoints } from '../../endpoints/auth.endpoints';
import { HttpClient } from '../../modules/http/http-client';
import IOCContainer from '../../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../modules/inversify/service-identifiers';
import { RemoteRepository } from '../remote.repository';
import { AuthRepository } from './auth.repository';

export class AuthRepositoryImpl extends RemoteRepository<AuthEndpoints> implements AuthRepository {
	protected _endpoints = IOCContainer.get<AuthEndpoints>(SERVICE_IDENTIFIERS.AuthEndpoints);
	protected _httpClient = IOCContainer.get<HttpClient>(SERVICE_IDENTIFIERS.HttpClient);

	public authorize(): Either<void, void> {
		const url = this._endpoints.buildAuthUrl();

		window.open(url, '_blank', 'noopener');

		return right(undefined);
	}
}
