import { Either, right } from 'fp-ts/Either';
import IOCContainer from '../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../application/modules/inversify/service-identifiers';
import { AuthService } from '../../../application/services/auth.service';
import { AbstractUseCase } from '../abstract-use-case';
import { AuthorizeUserPayload } from './authorize-user.payload';

export class AuthorizeUserUseCase extends AbstractUseCase<AuthorizeUserPayload, void, void> {
	protected readonly _authService: AuthService;

	constructor() {
		super();

		this._authService = IOCContainer.get<AuthService>(SERVICE_IDENTIFIERS.AuthService);
	}

	async bodyAsync(payload: AuthorizeUserPayload): Promise<Either<void, void>> {
		this._authService.setAuthData(payload.token);

		return right(undefined);
	}
}
