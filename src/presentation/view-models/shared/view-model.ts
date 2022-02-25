import { injectable } from 'inversify';
import { makeObservable } from 'mobx';

@injectable()
export abstract class AbstractViewModel {
	constructor() {
		makeObservable(this);
	}

	public abstract get isLoading(): boolean;
}
