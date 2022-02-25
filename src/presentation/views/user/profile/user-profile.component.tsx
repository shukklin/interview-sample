import React, { FunctionComponent, useEffect } from 'react';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { UserProfileViewModel } from '../../../view-models/user/profile/user-profile.view-model';

export const UserProfile: FunctionComponent = () => {
	const userProfileViewModel = useInject<UserProfileViewModel>(SERVICE_IDENTIFIERS.UserProfileViewModel);

	useEffect(() => {
		userProfileViewModel.getUserProfile();
	}, []);

	return <div>{userProfileViewModel.userProfile?.display_name}</div>;
};
