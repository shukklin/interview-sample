import { Either } from 'fp-ts/Either';
import isNil from 'lodash/isNil';
import { ServerResponse } from '../../application/dtos/response/server-response';
import { ValidationMessage } from '../../application/dtos/validation/validation-message.dto';
import { AbstractUseCase } from './abstract-use-case';

export abstract class AbstractSubmitUseCase<TIn, TOut, TError> extends AbstractUseCase<
	TIn,
	TOut,
	ServerResponse<TError>
> {
	protected _isValidationErrorsValid = (validationErrors: ValidationMessage[] | undefined): boolean => {
		return !isNil(validationErrors) && Array.isArray(validationErrors) && validationErrors.length > 0;
	};

	async execute(payload: TIn): Promise<Either<ServerResponse<TError>, TOut>> {
		const result = await super.execute(payload);

		return result;
	}
}
