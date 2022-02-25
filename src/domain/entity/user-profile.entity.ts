import { observable } from 'mobx';
import { Entity } from './entity';

export class UserProfileEntity extends Entity {
	@observable display_name?: string;
}
