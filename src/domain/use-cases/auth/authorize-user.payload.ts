import { Token } from '../../../application/value-objects/auth/token.model';

export class AuthorizeUserPayload {
	token: Token = new Token();
}
