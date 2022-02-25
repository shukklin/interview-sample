import { Either } from 'fp-ts/Either';

export interface AuthRepository {
	authorize(): Either<void, void>;
}
