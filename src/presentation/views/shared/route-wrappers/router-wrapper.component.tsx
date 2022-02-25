import React, { FunctionComponent } from 'react';
import { Router } from 'react-router';
import { history } from './history';
import { RouterWrapperProps } from './router-wrapper.props';

export const RouterWrapper: FunctionComponent<RouterWrapperProps> = (props) => {
	return <Router history={history}>{props.children}</Router>;
};
