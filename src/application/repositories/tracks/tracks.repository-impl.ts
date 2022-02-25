import { TracksEndpoints } from '../../endpoints/tracks.endpoints';
import IOCContainer from '../../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../modules/inversify/service-identifiers';
import { TableRepositoryImpl } from '../table/table.repository-impl';
import { TracksRepository } from './tracks.repository';

export class TracksRepositoryImpl extends TableRepositoryImpl<TracksEndpoints> implements TracksRepository {
	_endpoints = IOCContainer.get<TracksEndpoints>(SERVICE_IDENTIFIERS.TracksEndpoints);
}
