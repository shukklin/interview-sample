import { BaseRoutePaths } from './shared/base.route-path';

export class AccessDeniedRoutePaths extends BaseRoutePaths {
	constructor() {
		super('/accessdenied');
	}
}
