import { ApiResponseType } from './api-response-type';

export type SpotifyApiResponseType<TResponseDto> = ApiResponseType<TResponseDto, SpotifyApi.ErrorObject>;
