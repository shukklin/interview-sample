import { isRight } from 'fp-ts/lib/Either';
import { computed } from 'mobx';
import { GetTracksPayload } from '../../../domain/use-cases/tracks/get-tracks.payload';
import { GetTracksUseCase } from '../../../domain/use-cases/tracks/get-tracks.use-case';
import { GetUsersTracksPayload } from '../../../domain/use-cases/users/get-user-tracks/get-users-tracks.payload';
import { GetUsersTracksUseCase } from '../../../domain/use-cases/users/get-user-tracks/get-users-tracks.use-case';
import { AbstractViewModel } from '../shared/view-model';

export class UserTracksViewModel extends AbstractViewModel {
	protected readonly getUsersTracksUseCase: GetUsersTracksUseCase;
	protected readonly getTracksUseCase: GetTracksUseCase;
	private _usersTracks: SpotifyApi.SavedTrackObject[] = [];

	constructor() {
		super();

		this.getTracksUseCase = new GetTracksUseCase();
		this.getUsersTracksUseCase = new GetUsersTracksUseCase();
	}

	@computed
	public get isLoading(): boolean {
		return this.getUsersTracksUseCase.isExecuting || this.getTracksUseCase.isExecuting;
	}

	get usersTracks(): SpotifyApi.SavedTrackObject[] {
		return this._usersTracks;
	}

	set usersTracks(value: SpotifyApi.SavedTrackObject[]) {
		this._usersTracks = value;
	}

	public async getUsersTracks(): Promise<void> {
		const command = new GetUsersTracksPayload();

		const result = await this.getUsersTracksUseCase.execute(command);

		if (isRight(result)) {
			this._usersTracks = result.right.items;
		}
	}

	public async getTracks(): Promise<void> {
		const command = new GetTracksPayload('3n3Ppam7vgaVa1iaRUc9Lp');

		await this.getTracksUseCase.execute(command);
	}
}
