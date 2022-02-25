import { Either } from 'fp-ts/Either';
import IOCContainer from '../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../application/modules/inversify/service-identifiers';
import { AuthRepository } from '../../../application/repositories/auth/auth.repository';
import { AbstractUseCase } from '../abstract-use-case';

export class LoginUseCase extends AbstractUseCase<void, void, void> {
	protected readonly _authRepository: AuthRepository;

	constructor() {
		super();

		this._authRepository = IOCContainer.get<AuthRepository>(SERVICE_IDENTIFIERS.AuthRepository);
	}

	async bodyAsync(): Promise<Either<void, void>> {
		return this._authRepository.authorize();
	}
}
