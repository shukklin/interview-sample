import React, { FunctionComponent } from 'react';
import { RouterConfig } from '../modules/router/router.config';
import { Header } from './common/header/header.component';
import { NotificationContainer } from './common/notification/notification-container.component';
import { Sidebar } from './shared/sidebar/sidebar.component';

export const App: FunctionComponent = () => {
	const routerConfig = new RouterConfig();

	return (
		<>
			<div className='container'>
				<Header />
				<Sidebar />
				{routerConfig.build()}
			</div>
			<NotificationContainer />
		</>
	);
};
