import { injectable } from 'inversify';

@injectable()
export class TranslationService {
	public translate(value: string): string {
		return value;
	}
}
