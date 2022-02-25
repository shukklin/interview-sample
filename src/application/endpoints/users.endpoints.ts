import { BaseEndpoints } from './base.endpoints';
import { EntityEndpoints } from './entity.enpoints';

export class UsersEndpoints extends BaseEndpoints implements EntityEndpoints {
	public readonly entity = '/me';

	public readonly getUserProfile = this.buildApiUrl(this.entity);

	public readonly getUserTracks = this.buildApiUrl(`${this.entity}/tracks`);
}
