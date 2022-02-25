import { TableGetItemsRequestParamsDto } from '../../dtos/table/request-params.dto';
import { TableEndpoints } from '../../endpoints/table.endpoints';
import { HttpClient } from '../../modules/http/http-client';
import IOCContainer from '../../modules/inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../../modules/inversify/service-identifiers';
import { ApiResponseType } from '../../types/api-response-type';
import { RemoteRepository } from '../remote.repository';
import { TableRepository } from './table.repository';

export abstract class TableRepositoryImpl<TEndpoints extends TableEndpoints>
	extends RemoteRepository<TEndpoints>
	implements TableRepository {
	_httpClient = IOCContainer.get<HttpClient>(SERVICE_IDENTIFIERS.HttpClient);

	public async getItems<TResponseDto, TError>(
		params: TableGetItemsRequestParamsDto,
	): ApiResponseType<TResponseDto, TError> {
		const { pageNumber, pageSize, ...sortParams } = params;

		const mergedParams = {
			limit: pageSize,
			offset: pageNumber * pageSize,
			...sortParams,
		};

		return await this._httpClient.list<TResponseDto, TError>(this._endpoints.getItemsUrl(), mergedParams);
	}

	public async getAllItems<TRequestDto, TError>(): ApiResponseType<TRequestDto, TError> {
		return await this._httpClient.list<TRequestDto, TError>(this._endpoints.getItemsUrl());
	}

	public async getItem<TResponseDto, TError>(id: string): ApiResponseType<TResponseDto, TError> {
		return await this._httpClient.get<TResponseDto, TError>(this._endpoints.getItemUrl(id));
	}

	public async createItem<TRequestDto, TResponseDto, TError>(
		data: TRequestDto,
	): ApiResponseType<TResponseDto, TError> {
		return await this._httpClient.post<TRequestDto, TResponseDto, TError>(this._endpoints.createItemUrl(), data);
	}

	public async updateItem<TRequestDto, TResponseDto, TError>(
		data: TRequestDto,
	): ApiResponseType<TResponseDto, TError> {
		return await this._httpClient.put<TRequestDto, TResponseDto, TError>(this._endpoints.updateItemUrl(), data);
	}

	public async deleteItem<TResponseDto, TError>(id: string): ApiResponseType<TResponseDto, TError> {
		return await this._httpClient.delete<TResponseDto, TError>(this._endpoints.deleteItemUrl(id));
	}
}
