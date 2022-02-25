import React from 'react';
import ReactDOM from 'react-dom';
import './application/modules/mobx/mobx.bootstrap';
import './presentation/assets/styles/styles';
import { App } from './presentation/views/app';
import { RouterWrapper } from './presentation/views/shared/route-wrappers/router-wrapper.component';

const rootElement = document.getElementById('root');

ReactDOM.render(
	<RouterWrapper>
		<App />
	</RouterWrapper>,
	rootElement,
);
