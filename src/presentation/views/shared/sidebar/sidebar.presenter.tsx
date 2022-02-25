import { injectable } from 'inversify';
import { SidebarViewModel } from './sidebar.view-model';

@injectable()
export class SidebarPresenter {
	private _sidebarViewModel: SidebarViewModel;

	constructor() {
		this._sidebarViewModel = new SidebarViewModel();
	}

	get sidebarViewModel(): SidebarViewModel {
		return this._sidebarViewModel;
	}
}
