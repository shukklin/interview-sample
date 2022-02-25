import React, { FunctionComponent, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SERVICE_IDENTIFIERS } from '../../../../../application/modules/inversify/service-identifiers';
import { AuthService } from '../../../../../application/services/auth.service';
import { HomeRoutePaths } from '../../../../modules/router/paths/home.route-paths';
import { LocationState } from '../../../../types/location-state';
import { useInject } from '../../../../util/hooks/use-inject.hook';
import { AnonymousRoute } from './anonymous-route';

type AnonymousRouteProps = AnonymousRoute;

export const AnonymousRouteImpl: FunctionComponent<AnonymousRouteProps> = (props) => {
	const authService = useInject<AuthService>(SERVICE_IDENTIFIERS.AuthService);
	const [homeRoutePaths] = useState(new HomeRoutePaths());
	const { from } = (props.location?.state as LocationState) || {
		from: { pathname: homeRoutePaths.rootPath },
	};

	return authService.isAuthorized ? <Redirect to={from} /> : <Route {...props} />;
};
