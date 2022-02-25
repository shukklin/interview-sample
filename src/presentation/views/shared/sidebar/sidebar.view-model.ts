import { makeAutoObservable } from 'mobx';

export class SidebarViewModel {
	private _isOpen = true;

	constructor() {
		makeAutoObservable(this);
	}

	get isOpen(): boolean {
		return this._isOpen;
	}

	set isOpen(value: boolean) {
		this._isOpen = value;
	}
}
