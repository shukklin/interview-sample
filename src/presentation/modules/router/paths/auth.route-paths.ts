import { BaseRoutePaths } from './shared/base.route-path';

export class AuthRoutePaths extends BaseRoutePaths {
	public readonly redirect = this._routePathBuilder.buildRoute('redirect');
	public readonly failed = this._routePathBuilder.buildRoute('failed');

	constructor() {
		super('/signin');
	}
}
