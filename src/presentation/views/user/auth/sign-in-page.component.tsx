import { observer } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { SignInViewModel } from '../../../view-models/user/auth/sign-in.view-model';
import { Button } from '../../shared/button/Button';

export const SignInPage: FunctionComponent = observer(() => {
	const signInPresenter = useInject<SignInViewModel>(SERVICE_IDENTIFIERS.SignInViewModel);

	return (
		<>
			<Button onClick={(): Promise<void> => signInPresenter.redirectToLoginPage()}>Authorize</Button>
		</>
	);
});
