import { injectable } from 'inversify';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { LogoutUseCase } from '../../../../domain/use-cases/auth/logout.use-case';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { UserProfileViewModel } from '../profile/user-profile.view-model';

@injectable()
export class LogoutViewModel {
	protected readonly logoutUseCase: LogoutUseCase;
	protected _userProfileViewModel = useInject<UserProfileViewModel>(SERVICE_IDENTIFIERS.UserProfileViewModel);

	constructor() {
		this.logoutUseCase = new LogoutUseCase();
	}

	public async logoutUser(): Promise<void> {
		this.logoutUseCase.execute();
		this._userProfileViewModel.clearUserProfile();
	}
}
