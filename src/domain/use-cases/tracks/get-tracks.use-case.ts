import { Either } from 'fp-ts/Either';
import { ServerResponse } from '../../../application/dtos/response/server-response';
import IOCContainer from '../../../application/modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../../application/modules/inversify/service-identifiers';
import { TracksRepositoryImpl } from '../../../application/repositories/tracks/tracks.repository-impl';
import { AbstractUseCase } from '../abstract-use-case';
import { GetTracksPayload } from './get-tracks.payload';

export class GetTracksUseCase extends AbstractUseCase<
	GetTracksPayload,
	SpotifyApi.TrackObjectFull,
	ServerResponse<SpotifyApi.ErrorObject>
> {
	protected readonly _tracksRepository: TracksRepositoryImpl;

	constructor() {
		super();

		this._tracksRepository = IOCContainer.get(SERVICE_IDENTIFIERS.TracksRepository);
	}

	protected async bodyAsync(
		payload: GetTracksPayload,
	): Promise<Either<ServerResponse<SpotifyApi.ErrorObject>, SpotifyApi.TrackObjectFull>> {
		return await this._tracksRepository.getItem<SpotifyApi.TrackObjectFull, SpotifyApi.ErrorObject>(
			payload.trackId,
		);
	}
}
