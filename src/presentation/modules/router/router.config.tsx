import React, { ReactNode } from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { AnonymousRoute } from '../../views/shared/route-wrappers/anonymous-route/anonymous-route';
import { AnonymousRouteImpl } from '../../views/shared/route-wrappers/anonymous-route/anonymous-route-impl.component';
import { ProtectedRoute } from '../../views/shared/route-wrappers/protected-route/protected-route';
import { ProtectedRouteImpl } from '../../views/shared/route-wrappers/protected-route/protected-route-impl.component';
import { PublicRoute } from '../../views/shared/route-wrappers/public-route/public-route';
import { PublicRouteImpl } from '../../views/shared/route-wrappers/public-route/public-route-impl.component';
import { UserTracksPage } from '../../views/tracks/user-tracks-page.component';
import { LogoutPage } from '../../views/user/auth/logout-page.component';
import { SignInPageFailed } from '../../views/user/auth/sign-in-page-failed.component';
import { SignInPageRedirect } from '../../views/user/auth/sign-in-page-redirect.component';
import { SignInPage } from '../../views/user/auth/sign-in-page.component';
import { AuthRoutePaths } from './paths/auth.route-paths';
import { HomeRoutePaths } from './paths/home.route-paths';
import { LogoutRoutePaths } from './paths/logout.route-paths';
import { UserTracksRoutePaths } from './paths/user-tracks.route-paths';

export class RouterConfig {
	protected readonly _signRoutePaths: AuthRoutePaths = new AuthRoutePaths();
	protected readonly _userTracksRoutePaths: UserTracksRoutePaths = new UserTracksRoutePaths();
	protected readonly _homeRoutePaths: HomeRoutePaths = new HomeRoutePaths();
	protected readonly _logoutRoutePaths: LogoutRoutePaths = new LogoutRoutePaths();

	get routes(): RouteProps[] {
		return [...this.anonymousRoutes, ...this.publicRoutes, ...this.protectedRoutes];
	}

	public get anonymousRoutes(): AnonymousRoute[] {
		return [
			{
				path: this._signRoutePaths.redirect,
				component: SignInPageRedirect,
			},
			{
				path: this._signRoutePaths.rootPath,
				component: SignInPage,
			},
			{
				path: this._signRoutePaths.failed,
				component: SignInPageFailed,
			},
		];
	}

	public get publicRoutes(): PublicRoute[] {
		return [];
	}

	public get protectedRoutes(): ProtectedRoute[] {
		return [
			{
				path: this._userTracksRoutePaths.rootPath,
				component: UserTracksPage,
				hasAccess: () => true,
			},
			{
				path: this._logoutRoutePaths.rootPath,
				component: LogoutPage,
				hasAccess: () => true,
			},
		];
	}

	build(): ReactNode {
		return (
			<Switch>
				{this.publicRoutes.map((route) => (
					<PublicRouteImpl key={route.path} {...route} />
				))}
				{this.anonymousRoutes.map((route) => (
					<AnonymousRouteImpl key={route.path} {...route} />
				))}
				{this.protectedRoutes.map((route) => (
					<ProtectedRouteImpl key={route.path} {...route} />
				))}
			</Switch>
		);
	}
}
