import React from 'react';
import { useHistory } from 'react-router-dom';

export const Page404: React.FunctionComponent = () => {
	const history = useHistory();

	const onGoBackClick = (): void => {
		history.goBack();
	};

	return (
		<div>
			<p>Данного ресурса не существует</p>

			<button onClick={onGoBackClick}>Вернуться назад</button>
		</div>
	);
};
