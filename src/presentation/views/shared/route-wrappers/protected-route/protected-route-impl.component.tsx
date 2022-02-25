import React, { FunctionComponent, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { SERVICE_IDENTIFIERS } from '../../../../../application/modules/inversify/service-identifiers';
import { AuthService } from '../../../../../application/services/auth.service';
import { AccessDeniedRoutePaths } from '../../../../modules/router/paths/access-denied.route-paths';
import { AuthRoutePaths } from '../../../../modules/router/paths/auth.route-paths';
import { useInject } from '../../../../util/hooks/use-inject.hook';
import { ProtectedRoute } from './protected-route';

export type ProtectedRouteProps = ProtectedRoute;

export const ProtectedRouteImpl: FunctionComponent<ProtectedRouteProps> = (props) => {
	const authService = useInject<AuthService>(SERVICE_IDENTIFIERS.AuthService);
	const [authRoutePaths] = useState(new AuthRoutePaths());
	const [accessDeniedRoutePaths] = useState(new AccessDeniedRoutePaths());
	const history = useHistory();

	const saveHistoryPath = (): void => authService.setLastAuthorisedPath(history.location.pathname);

	if (!authService.isAuthorized) {
		saveHistoryPath();

		return (
			<Redirect
				to={{
					pathname: authRoutePaths.rootPath,
					state: { from: props.location },
				}}
			/>
		);
	}

	if (!props.hasAccess()) {
		saveHistoryPath();

		return (
			<Redirect
				to={{
					pathname: accessDeniedRoutePaths.rootPath,
					state: { from: props.location },
				}}
			/>
		);
	}

	return <Route {...props} />;
};
