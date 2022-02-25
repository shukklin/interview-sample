import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react';
import React, { FunctionComponent } from 'react';
import { TrackProps } from './track.props';

const b = cn('track');

const bInfo = cn(b(), 'info');
const bPlayer = cn(b(), 'player');

export const Track: FunctionComponent<TrackProps> = observer((props) => {
	const item = props.item;

	return (
		<div className={b()}>
			<div className={bInfo()}>
				<img src={item.track.album.images[0].url} />
				<span>{item.track.name}</span>
			</div>
			<div className={bPlayer()}>
				<audio controls>
					<source src={item.track.preview_url || undefined} type='audio/mpeg' />
				</audio>
			</div>
		</div>
	);
});
