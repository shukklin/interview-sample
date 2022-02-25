export class UseCaseException extends Error {
	constructor(name: string) {
		super(name);
	}
}
