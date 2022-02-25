import { Either } from 'fp-ts/Either';
import { action, computed, makeObservable, observable } from 'mobx';
import { UseCaseException } from '../../application/exceptions/command.exception';

export abstract class AbstractUseCase<TIn, TOut, TError> {
	@observable protected _isExecuting = false;

	constructor() {
		makeObservable(this);
	}

	@computed
	get isExecuting(): boolean {
		return this._isExecuting;
	}

	async execute(payload: TIn): Promise<Either<TError, TOut>> {
		let result: Either<TError, TOut>;

		try {
			this._onStartExecuting();

			result = await this.bodyAsync(payload);
		} catch (e) {
			throw new UseCaseException(`Unexpected error happen at ${this.constructor.name}`);
		} finally {
			this._onEndExecuting();
		}

		return result;
	}

	protected abstract bodyAsync(payload: TIn): Promise<Either<TError, TOut>>;

	@action
	protected _onStartExecuting(): void {
		this._isExecuting = true;
	}

	@action
	protected _onEndExecuting(): void {
		this._isExecuting = false;
	}
}
