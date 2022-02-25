import { FunctionComponent, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { HomeRoutePaths } from '../../../modules/router/paths/home.route-paths';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { LogoutViewModel } from '../../../view-models/user/auth/logout.view-model';

export const LogoutPage: FunctionComponent = () => {
	const logoutViewModel = useInject<LogoutViewModel>(SERVICE_IDENTIFIERS.LogoutViewModel);
	const [homeRoutePaths] = useState(new HomeRoutePaths());

	useEffect(() => {
		logoutViewModel.logoutUser();
	}, []);

	return <Redirect to={homeRoutePaths.rootPath} />;
};
