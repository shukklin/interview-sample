import { ServerResponse } from '../dtos/response/server-response';

export class NetworkException extends Error {
	constructor(public readonly response?: ServerResponse) {
		super('NetworkError');
	}
}
