import { TrackEntity } from '../../../domain/entity/track.entity';
import { DomainMapper } from '../domain-mapper';

export class TrackMapper implements DomainMapper<SpotifyApi.SavedTrackObject, TrackEntity> {
	toDomain(dto: SpotifyApi.SavedTrackObject): TrackEntity {
		return {
			id: dto.track.id,
			name: dto.track.name,
			previewUrl: dto.track.preview_url,
		};
	}
}
