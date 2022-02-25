import { Either } from 'fp-ts/Either';
import { ServerResponse } from '../dtos/response/server-response';

export type ApiResponseType<TResponseDto, TError> = Promise<Either<ServerResponse<TError>, TResponseDto>>;
