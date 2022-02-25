import { RouteWithIdsOptions } from './route-with-ids-options';

export class RoutePathBuilder {
	constructor(protected readonly _rootPath: string) {}

	public buildRoute(url: string): string {
		return `${this._rootPath}/${url}`;
	}

	public buildRouteWithIds(options: RouteWithIdsOptions): string {
		const ids = options.ids
			? options.ids.map((item) => `/${item}`).join('')
			: options.idsNames.map((item) => `/:${item}`).join('');

		return this.buildRoute(ids);
	}

	public buildListRoute(): string {
		return this.buildRoute('');
	}

	public buildCreateRoute(): string {
		return this.buildRoute('create');
	}

	public buildViewRoute(): string {
		return this.buildRoute('view');
	}

	public buildEditorRoute(): string {
		return this.buildRoute('edit');
	}
}
