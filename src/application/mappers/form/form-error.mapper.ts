import { ValidationMessage } from '../../dtos/validation/validation-message.dto';
import { StringsDictionary } from '../../types/strings-dictionary';

export class FormErrorMapper {
	public static mapToError<TResponse>(validationErrors: ValidationMessage[]): StringsDictionary<TResponse> {
		const mappedErrors: StringsDictionary<TResponse> = {} as StringsDictionary<TResponse>;

		validationErrors.forEach((error: ValidationMessage) => {
			const fieldName = error.fieldName;

			mappedErrors[fieldName as keyof TResponse] = error.message;
		});

		return mappedErrors;
	}
}
