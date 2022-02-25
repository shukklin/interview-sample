import React from 'react';
import { useHistory } from 'react-router-dom';

export const AccessDeniedPage: React.FunctionComponent = () => {
	const history = useHistory();

	const onGoBackClick = (): void => {
		history.goBack();
	};

	return (
		<div>
			<p>У вас нет доступа к данной странице.</p>

			<button onClick={onGoBackClick}>Вернуться назад</button>
		</div>
	);
};
