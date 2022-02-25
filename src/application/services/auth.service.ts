import { addSeconds } from 'date-fns';
import { injectable } from 'inversify';
import IOCContainer from '../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../modules/inversify/service-identifiers';
import { Token } from '../value-objects/auth/token.model';

@injectable()
export class AuthService {
	private readonly _accessTokenKey = 'access_token';
	private readonly _expiresInSecondsKey = 'expires_in_seconds';
	private readonly _lastAuthorizedPathKey = 'last_authorised_path';
	protected readonly _storage: Storage;

	constructor() {
		this._storage = IOCContainer.get<Storage>(SERVICE_IDENTIFIERS.BrowserLocalStorage);
	}

	get accessToken(): string | null {
		return this._storage.getItem(this._accessTokenKey);
	}

	get lastAuthorisedPath(): string | null {
		return this._storage.getItem(this._lastAuthorizedPathKey);
	}

	get expiresIn(): number {
		const expiresInSeconds = this._storage.getItem(this._expiresInSecondsKey);
		const currentDateTime = Date.now();

		return expiresInSeconds ? addSeconds(currentDateTime, Number(expiresInSeconds)).getTime() : currentDateTime;
	}

	get isAuthorized(): boolean {
		return !!this.accessToken && Date.now() < this.expiresIn;
	}

	public setAccessToken(token: string): void {
		this._storage.setItem(this._accessTokenKey, token);
	}

	public setExpiresIn(value: number): void {
		this._storage.setItem(this._expiresInSecondsKey, value.toString());
	}

	public setLastAuthorisedPath(path: string): void {
		this._storage.setItem(this._lastAuthorizedPathKey, path);
	}

	public clearLastAuthorisedPath(): void {
		this._storage.removeItem(this._lastAuthorizedPathKey);
	}

	public clearAccessToken(): void {
		this._storage.removeItem(this._accessTokenKey);
	}

	public clearExpiresIn(): void {
		this._storage.removeItem(this._expiresInSecondsKey);
	}

	public setAuthData(dto: Token): void {
		this.setAccessToken(dto.access_token);
		this.setExpiresIn(dto.expires_in);
	}

	public clearAuthData(): void {
		this.clearAccessToken();
		this.clearExpiresIn();
	}
}
