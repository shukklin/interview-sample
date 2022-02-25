import { makeObservable, observable } from 'mobx';

export class Entity {
	@observable id = '';

	constructor() {
		makeObservable(this);
	}
}
