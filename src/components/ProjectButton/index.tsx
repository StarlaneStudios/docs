import React from 'react';
import Link from '@docusaurus/Link';

export interface ProjectButtonProps {
	icon: string;
	name: string;
	link: string;
}

export function ProjectButton(props: ProjectButtonProps) {
	return (
		<Link
			className="project"
			to={props.link}
		>
			<div>
				<img src={props.icon} alt={props.name} className="project-icon" />
				<p className="project-name">{props.name}</p>
			</div>
		</Link>
	)
}