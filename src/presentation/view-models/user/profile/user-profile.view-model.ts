import { isRight } from 'fp-ts/lib/Either';
import { injectable } from 'inversify';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { UserProfileEntity } from '../../../../domain/entity/user-profile.entity';
import { GetUserProfileUseCase } from '../../../../domain/use-cases/users/get-user-profile/get-user-profile.use-case';

@injectable()
export class UserProfileViewModel {
	protected readonly getUserProfileUseCase: GetUserProfileUseCase;
	@observable private _userProfile: UserProfileEntity | undefined = new UserProfileEntity();

	constructor() {
		this.getUserProfileUseCase = new GetUserProfileUseCase();

		makeAutoObservable(this);
	}

	@computed
	public get userProfile(): UserProfileEntity | undefined {
		return this._userProfile;
	}

	@action
	public async getUserProfile(): Promise<void> {
		const result = await this.getUserProfileUseCase.execute();

		if (isRight(result)) {
			this._userProfile = result.right;
		}
	}

	@action
	public async clearUserProfile(): Promise<void> {
		this._userProfile = undefined;
	}
}
