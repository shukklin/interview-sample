import { UserProfileEntity } from '../../../domain/entity/user-profile.entity';
import { DomainMapper } from '../domain-mapper';

export class UserMapper implements DomainMapper<SpotifyApi.UserProfileResponse, UserProfileEntity> {
	toDomain(dto: SpotifyApi.UserProfileResponse): UserProfileEntity {
		return {
			id: dto.id,
			display_name: dto.display_name,
		};
	}
}
