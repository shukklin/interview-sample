import React, { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';

export const NotificationContainer: FunctionComponent = () => {
	return <ToastContainer limit={3} />;
};
