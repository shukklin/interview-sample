import { RoutePathBuilder } from '../shared/route-path-builder';

export abstract class BaseRoutePaths {
	protected readonly _routePathBuilder;

	constructor(protected readonly _rootPath: string) {
		this._routePathBuilder = new RoutePathBuilder(_rootPath);
	}

	get rootPath(): string {
		return this._rootPath;
	}
}
