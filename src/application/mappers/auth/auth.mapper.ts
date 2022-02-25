import { Token } from '../../value-objects/auth/token.model';
import { AuthenticationSuccessResponseDto } from '../../dtos/auth/authentication-success-response.dto';
import { DomainMapper } from '../domain-mapper';

export class AuthMapper implements DomainMapper<AuthenticationSuccessResponseDto, Token> {
	toDomain(dto: AuthenticationSuccessResponseDto): Token {
		return {
			access_token: dto.access_token,
			expires_in: dto.expires_in,
		};
	}
}
