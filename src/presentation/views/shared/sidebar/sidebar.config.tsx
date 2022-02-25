import { HomeRoutePaths } from '../../../modules/router/paths/home.route-paths';
import { AuthRoutePaths } from '../../../modules/router/paths/auth.route-paths';
import { UserTracksRoutePaths } from '../../../modules/router/paths/user-tracks.route-paths';
import { SidebarLink } from './sidebar-link';

export class SidebarConfig {
	protected readonly _signRoutePaths: AuthRoutePaths = new AuthRoutePaths();
	protected readonly _userTracksRoutePaths: UserTracksRoutePaths = new UserTracksRoutePaths();
	protected readonly _homeRoutePaths: HomeRoutePaths = new HomeRoutePaths();
	protected readonly _links: SidebarLink[] = [
		{
			url: this._userTracksRoutePaths.rootPath,
			title: 'User tracks',
			isVisible: true,
		},
		{
			url: this._homeRoutePaths.rootPath,
			title: 'Home',
			isVisible: true,
		},
	];

	get links(): SidebarLink[] {
		return this._links;
	}
}
