import { TableGetItemsRequestParamsDto } from '../../dtos/table/request-params.dto';
import { ApiResponseType } from '../../types/api-response-type';

export interface TableRepository {
	getItems<TResponseDto, TError>(
		params: TableGetItemsRequestParamsDto,
		filters?: Record<string, string>,
	): ApiResponseType<TResponseDto, TError>;
	getAllItems<TResponseDto, TError>(): ApiResponseType<TResponseDto, TError>;
	getItem<TResponseDto, TError>(id: string): ApiResponseType<TResponseDto, TError>;
	createItem<TRequestDto, TResponseDto, TError>(data: TRequestDto): ApiResponseType<TResponseDto, TError>;
	updateItem<TRequestDto, TResponseDto, TError>(data: TRequestDto): ApiResponseType<TResponseDto, TError>;
	deleteItem<TResponseDto, TError>(id: string): ApiResponseType<TResponseDto, TError>;
}
