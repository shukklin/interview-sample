import { Either } from 'fp-ts/Either';
import { ServerResponse } from '../../../../application/dtos/response/server-response';
import IOCContainer from '../../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { UsersRepositoryImpl } from '../../../../application/repositories/users/users.repository-impl';
import { AbstractUseCase } from '../../abstract-use-case';
import { GetUsersTracksPayload } from './get-users-tracks.payload';

export class GetUsersTracksUseCase extends AbstractUseCase<
	GetUsersTracksPayload,
	SpotifyApi.UsersSavedTracksResponse,
	ServerResponse<SpotifyApi.ErrorObject>
> {
	protected readonly _usersRepository: UsersRepositoryImpl;

	constructor() {
		super();

		this._usersRepository = IOCContainer.get(SERVICE_IDENTIFIERS.UsersRepository);
	}

	protected async bodyAsync(
		payload: GetUsersTracksPayload,
	): Promise<Either<ServerResponse<SpotifyApi.ErrorObject>, SpotifyApi.UsersSavedTracksResponse>> {
		const offset = Math.round(Math.random() * 1000);

		return await this._usersRepository.getUsersTracks(offset);
	}
}
