import { useState } from 'react';
import IOCContainer from '../../../application/modules/inversify/inversify-container';

export function useInject<T>(id: symbol): T {
	const [store] = useState(() => {
		return IOCContainer.get<T>(id);
	});

	return store;
}
