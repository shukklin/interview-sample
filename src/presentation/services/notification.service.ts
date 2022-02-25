import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import { ReactNode } from 'react';
import { injectable } from 'inversify';

@injectable()
export class NotificationServiceImpl {
	private static readonly notificationContainerPosition = 'top-right';
	private static readonly autoCloseDelayMs = 5000;
	private static readonly _errorNotificationType = 'error';
	private static readonly _successNotificationType = 'success';

	private readonly _config: ToastOptions;

	constructor() {
		this._config = {
			draggable: false,
			position: NotificationServiceImpl.notificationContainerPosition,
			autoClose: NotificationServiceImpl.autoCloseDelayMs,
		};
	}

	public createNotification(type: TypeOptions, message: ReactNode): void {
		toast(message, { ...this._config, type });
	}

	get errorNotificationType(): string {
		return NotificationServiceImpl._errorNotificationType;
	}

	get successNotificationType(): string {
		return NotificationServiceImpl._successNotificationType;
	}
}
