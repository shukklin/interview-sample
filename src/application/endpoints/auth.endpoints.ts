import queryString from 'query-string';
import { AuthRoutePaths } from '../../presentation/modules/router/paths/auth.route-paths';
import { AuthenticationRequestDto } from '../dtos/auth/authentication-request.dto';
import { BaseEndpoints } from './base.endpoints';

export class AuthEndpoints extends BaseEndpoints {
	protected readonly _authUrl = process.env['REACT_APP_SPOTIFY_AUTH_URL'];
	private readonly _acceptedScopes = ['user-read-email', 'user-library-read', 'user-read-private'];
	private readonly _clientId = process.env['REACT_APP_SPOTIFY_CLIENT_ID'];
	protected _signInRoutePaths = new AuthRoutePaths();

	public buildAuthUrl(): string {
		if (!this._clientId) {
			throw new Error('Spotify client id is not defined in environment config');
		}

		if (!this._authUrl) {
			throw new Error('Spotify auth url is not defined in environment config');
		}

		const requestParams: AuthenticationRequestDto = {
			client_id: this._clientId,
			redirect_uri: `${document.location.origin}${this._signInRoutePaths.redirect}`,
			response_type: 'token',
			scope: this._acceptedScopes.join(' '),
		};

		const stringifiedRequestParams = queryString.stringify(requestParams);
		const url = `${this._authUrl}/authorize?${stringifiedRequestParams}`;

		return url;
	}
}
