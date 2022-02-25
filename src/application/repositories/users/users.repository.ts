import { UserProfileEntity } from '../../../domain/entity/user-profile.entity';
import { SpotifyApiResponseType } from '../../types/spotify-api-response.type';

export interface UsersRepository {
	getUsersTracks: (offset: number, limit: number) => SpotifyApiResponseType<SpotifyApi.UsersSavedTracksResponse>;
	getUserProfile: () => SpotifyApiResponseType<UserProfileEntity>;
}
