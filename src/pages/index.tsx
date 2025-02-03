import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import { ProjectButton } from '../components/ProjectButton';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<img alt="Logo" className={styles.logo} />
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<ProjectButton
						name="Cirql"
						icon="/img/cirql/logo.svg"
						link="/cirql"
					/>
					<ProjectButton
						name="Transago"
						icon="/img/transago/logo.svg"
						link="/transago"
					/>
				</div>
			</div>
		</header>
	);
}

export default function Home(): Element {
	return (
		<Layout
			title="Starlane Docs"
			description="The documentation platform for most Starlane Studios projects"
		>
			<HomepageHeader />
		</Layout>
	);
}
