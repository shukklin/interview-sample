import { AxiosRequestConfig } from 'axios';
import { ApiResponseType } from '../../types/api-response-type';

export interface HttpClient<TConfig = AxiosRequestConfig> {
	get<TResponse, TError>(url: string, config?: TConfig): ApiResponseType<TResponse, TError>;
	post<TRequest, TResponse, TError>(
		url: string,
		body: TRequest | undefined,
		config?: TConfig,
	): ApiResponseType<TResponse, TError>;
	put<TRequestDto, TResponse, TError>(
		url: string,
		body: TRequestDto | undefined,
		config?: TConfig,
	): ApiResponseType<TResponse, TError>;
	list<TResponse, TError>(url: string, parameters?: unknown, config?: TConfig): ApiResponseType<TResponse, TError>;
	delete<TResponse, TError>(url: string, config?: TConfig): ApiResponseType<TResponse, TError>;
	upload<TResponse, TError>(
		url: string,
		formDataFieldName: string,
		file: File,
		config?: TConfig,
	): ApiResponseType<TResponse, TError>;
}
