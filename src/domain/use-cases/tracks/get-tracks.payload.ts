export class GetTracksPayload {
	constructor(private readonly _trackId: string) {}

	get trackId(): string {
		return this._trackId;
	}
}
