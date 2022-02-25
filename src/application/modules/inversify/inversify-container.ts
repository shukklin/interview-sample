import { Container } from 'inversify';
import 'reflect-metadata';
import { NotificationServiceImpl } from '../../../presentation/services/notification.service';
import { UserTracksViewModel } from '../../../presentation/view-models/tracks/user-tracks.view-model';
import { LogoutViewModel } from '../../../presentation/view-models/user/auth/logout.view-model';
import { SignInViewModel } from '../../../presentation/view-models/user/auth/sign-in.view-model';
import { UserProfileViewModel } from '../../../presentation/view-models/user/profile/user-profile.view-model';
import { SidebarPresenter } from '../../../presentation/views/shared/sidebar/sidebar.presenter';
import { AuthEndpoints } from '../../endpoints/auth.endpoints';
import { TracksEndpoints } from '../../endpoints/tracks.endpoints';
import { UsersEndpoints } from '../../endpoints/users.endpoints';
import { AuthRepositoryImpl } from '../../repositories/auth/auth.repository-impl';
import { TracksRepositoryImpl } from '../../repositories/tracks/tracks.repository-impl';
import { UsersRepositoryImpl } from '../../repositories/users/users.repository-impl';
import { AuthService } from '../../services/auth.service';
import { BrowserLocalStorage } from '../../services/storage/browser-local-storage';
import { InMemoryStorage } from '../../services/storage/in-memory.storage';
import { TranslationService } from '../../services/translation.service';
import { ServerErrorHandler } from '../../utils/server-error-handler';
import { HttpClientImpl } from '../http/http-client-impl';
import { SERVICE_IDENTIFIERS } from './service-identifiers';

const IOCContainer = new Container();

IOCContainer.bind(SERVICE_IDENTIFIERS.HttpClient).to(HttpClientImpl);

IOCContainer.bind(SERVICE_IDENTIFIERS.TracksRepository).to(TracksRepositoryImpl).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.AuthRepository).to(AuthRepositoryImpl).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.UsersRepository).to(UsersRepositoryImpl).inSingletonScope();

IOCContainer.bind(SERVICE_IDENTIFIERS.AuthEndpoints).to(AuthEndpoints).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.TracksEndpoints).to(TracksEndpoints).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.UsersEndpoints).to(UsersEndpoints).inSingletonScope();

IOCContainer.bind(SERVICE_IDENTIFIERS.SignInViewModel).to(SignInViewModel);
IOCContainer.bind(SERVICE_IDENTIFIERS.LogoutViewModel).to(LogoutViewModel);
IOCContainer.bind(SERVICE_IDENTIFIERS.UserProfileViewModel).to(UserProfileViewModel).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.UserTracksViewModel).to(UserTracksViewModel);
IOCContainer.bind(SERVICE_IDENTIFIERS.SidebarViewModel).to(SidebarPresenter);

IOCContainer.bind(SERVICE_IDENTIFIERS.AuthService).to(AuthService);
IOCContainer.bind(SERVICE_IDENTIFIERS.TranslationService).to(TranslationService);

IOCContainer.bind(SERVICE_IDENTIFIERS.NotificationService).to(NotificationServiceImpl).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.ServerErrorHandler).to(ServerErrorHandler).inSingletonScope();

IOCContainer.bind(SERVICE_IDENTIFIERS.BrowserLocalStorage).to(BrowserLocalStorage).inSingletonScope();
IOCContainer.bind(SERVICE_IDENTIFIERS.InMemoryStorage).to(InMemoryStorage);

export default IOCContainer;
