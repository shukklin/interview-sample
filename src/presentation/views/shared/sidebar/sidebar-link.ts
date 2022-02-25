import { ReactNode } from 'react';
export interface SidebarLink {
	url: string;
	title: string;
	icon?: ReactNode;
	className?: string;
	childLinks?: SidebarLink[];
	isVisible: boolean;
	onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}
