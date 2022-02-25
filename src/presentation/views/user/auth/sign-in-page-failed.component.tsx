import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';

export const SignInPageFailed: FunctionComponent = observer(() => {
	return (
		<div>
			<p>Authorization is failed</p>
			<p>Try to change account</p>
		</div>
	);
});
