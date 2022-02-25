import { Either, right } from 'fp-ts/Either';
import IOCContainer from '../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../application/modules/inversify/service-identifiers';
import { AuthService } from '../../../application/services/auth.service';
import { AbstractUseCase } from '../abstract-use-case';

export class LogoutUseCase extends AbstractUseCase<void, void, void> {
	protected readonly _authService: AuthService;

	constructor() {
		super();

		this._authService = IOCContainer.get<AuthService>(SERVICE_IDENTIFIERS.AuthService);
	}

	async bodyAsync(): Promise<Either<void, void>> {
		this._authService.clearAuthData();

		return right(undefined);
	}
}
