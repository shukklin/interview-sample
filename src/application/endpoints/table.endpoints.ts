import { BaseEndpoints } from './base.endpoints';
import { EntityEndpoints } from './entity.enpoints';

export abstract class TableEndpoints extends BaseEndpoints implements EntityEndpoints {
	public abstract readonly entity: string;

	public getItemUrl(id: string): string {
		return this.buildApiUrl(`${this.entity}/${id}`);
	}

	public getItemsUrl(): string {
		return this.buildApiUrl(`${this.entity}`);
	}

	public createItemUrl(): string {
		return this.buildApiUrl(`${this.entity}`);
	}

	public updateItemUrl(): string {
		return this.buildApiUrl(`${this.entity}`);
	}

	public deleteItemUrl(id: string): string {
		return this.buildApiUrl(`${this.entity}/${id}`);
	}
}
