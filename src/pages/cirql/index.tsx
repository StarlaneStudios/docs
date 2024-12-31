import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './cirql.module.css';

function CirqlHeader() {
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<img src="/img/cirql/logo.svg" alt="Logo" className={styles.logo} />
				<h1 className="hero__title">Cirql</h1>
				<p className="hero__subtitle">SurrealDB ORM & Query Builder</p>
				<div className={styles.buttons}>
					<Link
						className="button button--primary button--lg"
						to="/cirql/guide"
					>
						Get started
					</Link>
					<Link
						className="button button--secondary button--lg"
						to="/cirql/api"
					>
						API Reference
					</Link>
				</div>
				<div className={styles.card}>
					Cirql <em>(pronounced Circle)</em> is a simple and lightweight ORM and query builder for <a href="https://surrealdb.com/">SurrealDB</a> with
					built in model mapping and validation powered by <a href="https://github.com/colinhacks/zod">Zod</a>.
					Unlike most query builders, Cirql takes a very open approach, providing you with complete control over your queries.
				</div>
			</div>
		</header>
	);
}

export default function Cirql(): Element {
	return (
		<Layout
			title="SurrealDB ORM & Query Builder"
			description="Cirql is a simple and lightweight ORM and query builder for SurrealDB with built in model mapping and validation powered by Zod"
		>
			<CirqlHeader />
		</Layout>
	);
}
