import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { LoaderProps } from './loader.props';

const OPEN_LOADER_DELAY_MS = 300;
const CLOSE_LOADER_TIMEOUT_MS = 200;

const containerCn = cn('loader-container');

export const Loader: FunctionComponent<LoaderProps> = observer((props) => {
	const [isActive, setActive] = useState<boolean>(false);
	const openLoaderTimer = useRef<NodeJS.Timeout | undefined>(undefined);
	const closeLoaderTimer = useRef<NodeJS.Timeout | undefined>(undefined);

	const clearTimers = (): void => {
		if (openLoaderTimer.current) {
			clearTimeout(openLoaderTimer.current);
		}

		if (closeLoaderTimer.current) {
			clearTimeout(closeLoaderTimer.current);
		}
	};

	const onOpenLoader = () => {
		openLoaderTimer.current = setTimeout(() => {
			setActive(true);
		}, OPEN_LOADER_DELAY_MS);
	};

	const onCloseLoader = () => {
		if (openLoaderTimer.current) {
			clearTimeout(openLoaderTimer.current);
			openLoaderTimer.current = undefined;
		}

		closeLoaderTimer.current = setTimeout(() => setActive(false), CLOSE_LOADER_TIMEOUT_MS);
	};

	useEffect(() => {
		if (props.isLoading) {
			onOpenLoader();
		} else {
			onCloseLoader();
		}

		return () => {
			clearTimers();
		};
	}, [props.isLoading]);

	return (
		<div
			className={containerCn({
				active: isActive,
			})}
		>
			Loading...
		</div>
	);
});
