import { injectable } from 'inversify';
import { LogoutRoutePaths } from '../../presentation/modules/router/paths/logout.route-paths';
import { NotificationServiceImpl } from '../../presentation/services/notification.service';
import { history } from '../../presentation/views/shared/route-wrappers/history';
import { ServerResponse } from '../dtos/response/server-response';
import IOCContainer from '../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../modules/inversify/service-identifiers';

@injectable()
export class ServerErrorHandler {
	private readonly _notificationService: NotificationServiceImpl;
	private readonly _logoutRoutePaths: LogoutRoutePaths = new LogoutRoutePaths();

	public constructor() {
		this._notificationService = IOCContainer.get<NotificationServiceImpl>(SERVICE_IDENTIFIERS.NotificationService);
	}

	public handleError(res: ServerResponse<unknown> | undefined): void {
		if (res === undefined) {
			this._notificationService.createNotification('error', 'Server is unavailable');

			return;
		}

		switch (res.status) {
			case 400: {
				this._notificationService.createNotification('error', '400 error');
				break;
			}
			case 401: {
				this._notificationService.createNotification('error', '401 error');
				history.push(this._logoutRoutePaths.rootPath);
				break;
			}
			case 403: {
				this._notificationService.createNotification('error', '403 error');
				break;
			}
			case 404: {
				this._notificationService.createNotification('error', '404 error');
				break;
			}
			case 500: {
				this._notificationService.createNotification('error', '500 error');
				break;
			}

			default: {
				this._notificationService.createNotification('error', 'unknown error');
				break;
			}
		}
	}
}
