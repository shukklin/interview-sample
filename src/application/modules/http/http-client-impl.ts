import { AxiosError, AxiosInstance, AxiosRequestConfig, CancelTokenSource, default as Axios } from 'axios';
import { left, right } from 'fp-ts/Either';
import { injectable } from 'inversify';
import { AuthService } from '../../services/auth.service';
import { ApiResponseType } from '../../types/api-response-type';
import { FormDataUtil } from '../../util/form-data.helper';
import { ServerErrorHandler } from '../../utils/server-error-handler';
import IOCContainer from '../inversify/inversify-container';
import { SERVICE_IDENTIFIERS } from '../inversify/service-identifiers';
import { HttpClient } from './http-client';

@injectable()
export class HttpClientImpl implements HttpClient {
	private readonly _activeRequests: Record<string, CancelTokenSource> = {};
	protected readonly _client: AxiosInstance;
	private readonly _authService: AuthService;
	private readonly _timeoutConnectionMs = 30000;
	private readonly _defaultHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	protected readonly _serverErrorHandler: ServerErrorHandler;
	public constructor() {
		this._client = Axios.create({
			headers: this._defaultHeaders,
			timeout: this._timeoutConnectionMs,
		});
		this._serverErrorHandler = IOCContainer.get(SERVICE_IDENTIFIERS.ServerErrorHandler);
		this._authService = IOCContainer.get(SERVICE_IDENTIFIERS.AuthService);
		this._handleServerRequest = this._handleServerRequest.bind(this);
		this._handleServerErrorResponse = this._handleServerErrorResponse.bind(this);

		this._client.interceptors.request.use(this._handleServerRequest);
		this._client.interceptors.response.use(undefined, this._handleServerErrorResponse);
	}

	public async get<TResponse, TError>(url: string, config?: AxiosRequestConfig): ApiResponseType<TResponse, TError> {
		try {
			const result = await this._client.get(url, config);

			return right(result.data);
		} catch (e) {
			return left(e);
		}
	}

	public async post<TRequest, TResponse, TError>(
		url: string,
		body?: TRequest,
		config?: AxiosRequestConfig,
	): ApiResponseType<TResponse, TError> {
		try {
			const result = await this._client.post(url, body, config);

			return right(result.data);
		} catch (e) {
			return left(e);
		}
	}

	public async put<TRequest, TResponse, TError>(
		url: string,
		body: TRequest,
		config?: AxiosRequestConfig,
	): ApiResponseType<TResponse, TError> {
		try {
			const result = await this._client.put(url, body, config);

			return right(result.data);
		} catch (e) {
			return left(e);
		}
	}

	public async list<TResponse, TError>(
		url: string,
		parameters?: unknown,
		config?: AxiosRequestConfig,
	): ApiResponseType<TResponse, TError> {
		return await this.get(url, { ...config, params: parameters });
	}

	public async delete<TResponse, TError>(
		url: string,
		config?: AxiosRequestConfig,
	): ApiResponseType<TResponse, TError> {
		try {
			const result = await this._client.delete(url, config);

			return right(result.data);
		} catch (e) {
			return left(e);
		}
	}

	public async upload<TResponse, TError>(
		url: string,
		formDataFieldName: string,
		file: File,
		config?: AxiosRequestConfig,
	): ApiResponseType<TResponse, TError> {
		return await this.post<FormData, TResponse, TError>(
			url,
			FormDataUtil.getFileFormData(formDataFieldName, file),
			{
				...config,
				headers: { 'Content-Type': 'multipart/form-application' },
			},
		);
	}

	private _addCancelTokenToRequest(url: string | undefined, config: AxiosRequestConfig): void {
		if (!url) {
			throw new Error('Request url is not defined');
		}

		const sourceToken = Axios.CancelToken.source();

		this._activeRequests[url] = sourceToken;

		config.cancelToken = sourceToken.token;
	}

	private _clearCancelToken(url: string | undefined): void {
		if (!url) {
			throw new Error('Request url is not defined');
		}

		delete this._activeRequests[url];
	}

	private _cancelAlreadyRunningRequest(url: string | undefined): void {
		if (!url) {
			throw new Error('Request url is not defined');
		}

		const activeRequest = this._activeRequests[url];

		if (activeRequest) {
			activeRequest.cancel('Cancel already running request');
			this._clearCancelToken(url);
		}
	}

	private _handleServerRequest(request: AxiosRequestConfig): AxiosRequestConfig {
		this._cancelAlreadyRunningRequest(request.url);
		this._addCancelTokenToRequest(request.url, request);

		const accessToken = this._authService.accessToken;

		if (accessToken) {
			request.headers['Authorization'] = `Bearer ${accessToken}`;
		}

		return request;
	}

	private async _handleServerErrorResponse(error: AxiosError): Promise<unknown> {
		this._clearCancelToken(error.config.url);

		this._serverErrorHandler.handleError(error.response);

		return Promise.reject(error);
	}
}
