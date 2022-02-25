import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react';
import React, { FunctionComponent, useState } from 'react';
import { SERVICE_IDENTIFIERS } from '../../../../application/modules/inversify/service-identifiers';
import { useInject } from '../../../util/hooks/use-inject.hook';
import { Menu } from '../menu/menu.component';
import { SidebarConfig } from './sidebar.config';
import { SidebarPresenter } from './sidebar.presenter';

const b = cn('sidebar');

export const Sidebar: FunctionComponent = observer(() => {
	const sidebarPresenter = useInject<SidebarPresenter>(SERVICE_IDENTIFIERS.SidebarViewModel);
	const [menuLinks] = useState(new SidebarConfig().links);
	const sidebarModel = sidebarPresenter.sidebarViewModel;

	if (!sidebarModel.isOpen) {
		return null;
	}

	return (
		<aside className={b()}>
			<Menu links={menuLinks} />
		</aside>
	);
});
