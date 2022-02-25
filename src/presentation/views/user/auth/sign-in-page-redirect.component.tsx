import { observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { AuthRoutePaths } from '../../../modules/router/paths/auth.route-paths';
import { HomeRoutePaths } from '../../../modules/router/paths/home.route-paths';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { SignInViewModel } from '../../../view-models/user/auth/sign-in.view-model';

export const SignInPageRedirect: FunctionComponent = observer(() => {
	const [signInRoutePaths] = useState(new AuthRoutePaths());
	const [homeRoutePaths] = useState(new HomeRoutePaths());
	const signInViewModel = useInject<SignInViewModel>(SERVICE_IDENTIFIERS.SignInViewModel);

	useEffect(() => {
		signInViewModel.redirectUser();
	}, [signInViewModel]);

	if (signInViewModel.isRedirectSuccess === undefined) {
		return null; // TODO put loader
	}

	return signInViewModel.isRedirectSuccess ? (
		<Redirect to={homeRoutePaths.rootPath} />
	) : (
		<Redirect to={signInRoutePaths.failed} />
	);
});
