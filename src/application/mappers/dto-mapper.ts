export interface DtoMapper<TDto, TModel> {
	toDto(model: TModel): TDto;
}
