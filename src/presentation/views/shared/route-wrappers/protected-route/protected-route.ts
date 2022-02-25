import { Route } from '../route';

export type ProtectedRoute = Route & {
	hasAccess: () => boolean;
};
