import { Either } from 'fp-ts/Either';
import { ServerResponse } from '../../../../application/dtos/response/server-response';
import IOCContainer from '../../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { UsersRepositoryImpl } from '../../../../application/repositories/users/users.repository-impl';
import { UserProfileEntity } from '../../../entity/user-profile.entity';
import { AbstractUseCase } from '../../abstract-use-case';

export class GetUserProfileUseCase extends AbstractUseCase<
	void,
	UserProfileEntity,
	ServerResponse<SpotifyApi.ErrorObject>
> {
	protected readonly _usersRepository: UsersRepositoryImpl;

	constructor() {
		super();

		this._usersRepository = IOCContainer.get(SERVICE_IDENTIFIERS.UsersRepository);
	}

	protected async bodyAsync(): Promise<Either<ServerResponse<SpotifyApi.ErrorObject>, UserProfileEntity>> {
		return await this._usersRepository.getUserProfile();
	}
}
