import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { PublicRoute } from './public-route';

type PublicRouteProps = PublicRoute;

export const PublicRouteImpl: FunctionComponent<PublicRouteProps> = (props) => {
	return <Route {...props} />;
};
