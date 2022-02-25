export interface DomainMapper<TDto, TModel> {
	toDomain(dto: TDto): TModel;
}
