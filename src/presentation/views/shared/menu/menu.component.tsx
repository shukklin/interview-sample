import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react';
import React, { FunctionComponent, ReactNode } from 'react';
import { matchPath, NavLink, useHistory } from 'react-router-dom';
import { SidebarLink } from '../sidebar/sidebar-link';
import { MenuProps } from './menu.props';

const cnMenu = cn('menu');
const cnSubMenu = cn('submenu');
const cnMenuLink = cn(cnMenu(), 'link');
const cnMenuItem = cn(cnMenu(), 'item');
const cnMenuLinkIcon = cnMenuLink('icon');
const cnMenuLinkText = cnMenuLink('text');

export const Menu: FunctionComponent<MenuProps> = observer((props) => {
	const history = useHistory();

	const isLinkActive = (link: SidebarLink): boolean => {
		if (link.childLinks) {
			return link.childLinks.some(isPathExactLocation);
		} else {
			return isPathExactLocation(link);
		}
	};

	const isPathExactLocation = (item: SidebarLink): boolean => {
		return !!matchPath(history.location.pathname, item.url);
	};

	const onLinkClicked = (event: React.MouseEvent<HTMLAnchorElement>, item: SidebarLink) => {
		if (item.childLinks) {
			event.preventDefault();
		}
	};

	const getNavLink = (item: SidebarLink) => {
		if (item.childLinks && item.childLinks.length === 0) {
			return null;
		}

		return (
			<NavLink
				isActive={() => isLinkActive(item)}
				className={cnMenuLink()}
				to={item.url}
				onClick={(event) => onLinkClicked(event, item)}
				exact={true}
			>
				{item.icon && <span className={cnMenuLinkIcon}>{item.icon}</span>}

				<span className={cnMenuLinkText}>{item.title}</span>
			</NavLink>
		);
	};

	const renderLinks = (links: SidebarLink[]): ReactNode => {
		return links.map((item, index) => (
			<li className={cnMenuItem()} key={index} onClick={item.onClick}>
				{item.childLinks && <ul className={cnSubMenu()}>{renderLinks(item.childLinks)}</ul>}
				{getNavLink(item)}
			</li>
		));
	};

	return <ul className={cnMenu(props.className)}>{renderLinks(props.links)}</ul>;
});
