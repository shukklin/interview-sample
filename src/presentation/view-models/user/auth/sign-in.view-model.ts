import { Either, isRight, left } from 'fp-ts/Either';
import { injectable } from 'inversify';
import queryString from 'querystring';
import { AuthorizeUserPayload } from '../../../../domain/use-cases/auth/authorize-user.payload';
import { AuthorizeUserUseCase } from '../../../../domain/use-cases/auth/authorize-user.use-case';
import { LoginUseCase } from '../../../../domain/use-cases/auth/login.use-case';

@injectable()
export class SignInViewModel {
	protected readonly loginUseCase: LoginUseCase;
	protected readonly authorizeUserUseCase: AuthorizeUserUseCase;

	private _isRedirectSuccess: boolean | undefined;

	constructor() {
		this.loginUseCase = new LoginUseCase();
		this.authorizeUserUseCase = new AuthorizeUserUseCase();
	}

	public get isRedirectSuccess(): boolean | undefined {
		return this._isRedirectSuccess;
	}

	public set isRedirectSuccess(value: boolean | undefined) {
		this._isRedirectSuccess = value;
	}

	public async redirectUser(): Promise<void> {
		const result = await this.authorizeUser();

		if (isRight(result)) {
			this._isRedirectSuccess = true;
		} else {
			this._isRedirectSuccess = false;
		}
	}

	public async redirectToLoginPage(): Promise<void> {
		await this.loginUseCase.execute();
	}

	public async authorizeUser(): Promise<Either<void, void>> {
		const locationHash = window.location.hash.substring(1);
		const params = queryString.parse(locationHash);

		const accessToken = params['access_token'] as string;
		const expiresIn = params['expires_in'] as string;

		if (accessToken && expiresIn) {
			const command = new AuthorizeUserPayload();

			command.token.access_token = accessToken;
			command.token.expires_in = Number(expiresIn);

			return await this.authorizeUserUseCase.execute(command);
		}

		return left(undefined);
	}
}
