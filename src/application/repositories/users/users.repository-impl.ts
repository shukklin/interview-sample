import { isRight, right } from 'fp-ts/lib/Either';
import { UserProfileEntity } from '../../../domain/entity/user-profile.entity';
import { ServerResponse } from '../../dtos/response/server-response';
import { UsersEndpoints } from '../../endpoints/users.endpoints';
import { ECachePolicyType } from '../../enums/e-cache-policy-type';
import { UserMapper } from '../../mappers/user/user.mapper';
import { HttpClientImpl } from '../../modules/http/http-client-impl';
import IOCContainer from '../../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../modules/inversify/service-identifiers';
import { CachePolicyService } from '../../services/cache-policy.service';
import { SpotifyApiResponseType } from '../../types/spotify-api-response.type';
import { RemoteRepository } from '../remote.repository';
import { UsersRepository } from './users.repository';

export class UsersRepositoryImpl extends RemoteRepository<UsersEndpoints> implements UsersRepository {
	protected _httpClient = IOCContainer.get<HttpClientImpl>(SERVICE_IDENTIFIERS.HttpClient);
	protected _endpoints = IOCContainer.get<UsersEndpoints>(SERVICE_IDENTIFIERS.UsersEndpoints);
	protected _mapper = new UserMapper();
	protected _cachePolicyService = new CachePolicyService();

	public async getUsersTracks(
		offset: number,
		limit = 50,
	): SpotifyApiResponseType<SpotifyApi.UsersSavedTracksResponse> {
		const requestParams = {
			offset,
			limit,
		};

		return await this._httpClient.get(this._endpoints.getUserTracks, {
			params: requestParams,
		});
	}

	public async getUserProfile(): SpotifyApiResponseType<UserProfileEntity> {
		const url = this._endpoints.getUserProfile;
		const result = await this._cachePolicyService.execute<
			ServerResponse<SpotifyApi.ErrorObject>,
			SpotifyApi.UserProfileResponse
		>(url, () => this._httpClient.get(url), ECachePolicyType.Always);

		if (isRight(result)) {
			return right(this._mapper.toDomain(result.right));
		}

		return result;
	}
}
