import { observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { LogoutRoutePaths } from '../../../modules/router/paths/logout.route-paths';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { UserProfileViewModel } from '../../../view-models/user/profile/user-profile.view-model';
import { Button } from '../../shared/button/Button';

export const Header: FunctionComponent = observer(() => {
	const [logoutRoutePaths] = useState(new LogoutRoutePaths());
	const userProfileViewModel = useInject<UserProfileViewModel>(SERVICE_IDENTIFIERS.UserProfileViewModel);

	useEffect(() => {
		userProfileViewModel.getUserProfile();
	}, []);

	return (
		<header className='header'>
			<h1>Spotify Web Player</h1>
			<Button onClick={() => userProfileViewModel.getUserProfile()}>Sign In</Button>
			<span>{JSON.stringify(userProfileViewModel.userProfile)}</span>

			<Link to={logoutRoutePaths.rootPath}>Log out</Link>
		</header>
	);
});
