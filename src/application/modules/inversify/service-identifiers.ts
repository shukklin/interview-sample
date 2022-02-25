export const SERVICE_IDENTIFIERS = {
	HttpClient: Symbol.for('HttpClient'),
	AuthHttpClient: Symbol.for('AuthHttpClient'),

	AuthEndpoints: Symbol.for('AuthEndpoints'),
	TracksEndpoints: Symbol.for('TracksEndpoints'),
	UsersEndpoints: Symbol.for('UsersEndpoints'),

	TracksRepository: Symbol.for('TracksRepository'),
	AuthRepository: Symbol.for('AuthRepository'),
	UsersRepository: Symbol.for('UsersRepository'),

	NotificationService: Symbol.for('NotificationService'),
	TranslationService: Symbol.for('TranslationService'),

	SignInViewModel: Symbol.for('SignInViewModel'),
	LogoutViewModel: Symbol.for('LogoutViewModel'),
	UserProfileViewModel: Symbol.for('UserProfileViewModel'),
	UserTracksViewModel: Symbol.for('UserTracksViewModel'),
	SidebarViewModel: Symbol.for('SidebarViewModel'),

	AuthService: Symbol.for('AuthService'),

	ServerErrorHandler: Symbol.for('ServerErrorHandler'),

	BrowserLocalStorage: Symbol.for('BrowserLocalStorage'),
	InMemoryStorage: Symbol.for('InMemoryStorage'),
};
