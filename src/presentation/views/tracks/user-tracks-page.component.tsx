import { observer } from 'mobx-react';
import React, { FunctionComponent, useEffect } from 'react';
import { SERVICE_IDENTIFIERS } from '../../../application/modules/inversify/service-identifiers';
import { useInject } from '../../util/hooks/use-inject.hook';
import { UserTracksViewModel } from '../../view-models/tracks/user-tracks.view-model';
import { Button } from '../shared/button/Button';
import { Loader } from '../shared/loader/loader.component';
import { Track } from './item/track.component';

export const UserTracksPage: FunctionComponent = observer(() => {
	const userTracksModel = useInject<UserTracksViewModel>(SERVICE_IDENTIFIERS.UserTracksViewModel);

	useEffect(() => {
		userTracksModel.getUsersTracks();
	}, []);

	return (
		<>
			<Loader isLoading={userTracksModel.isLoading} />
			<Button onClick={(): Promise<void> => userTracksModel.getTracks()}>Get tracks</Button>
			<Button onClick={(): Promise<void> => userTracksModel.getUsersTracks()}>Get users tracks</Button>
			{userTracksModel.usersTracks.map((item) => (
				<Track key={item.track.id} item={item} />
			))}
		</>
	);
});
