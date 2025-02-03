import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './transago.module.css';

function TransagoHeader() {
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<img alt="Logo" className={styles.transagoLogo} />
				{/* <h1 className="hero__title">Transago</h1>
				<p className="hero__subtitle">A simple bill tracking system</p> */}

				<h1 className="hero__title">We're Still Cooking</h1>
				<p className="hero__subtitle">This project is coming very soon</p>
				<img src="/img/undraw/cooking.svg" className={styles.cookage} alt="We're Cooking" />

				{/* <div className={styles.buttons}>
					<Link
						className="button button--primary button--lg"
						to="/transago/installation"
					>
						Installation
					</Link>
				</div>
				<div className={styles.card}>
					A simple bill tracking system
				</div> */}
			</div>
		</header>
	);
}

export default function Transago(): Element {
	return (
		<Layout
			title="Transago"
			description="A simple bill tracking system"
		>
			<TransagoHeader />
		</Layout>
	);
}
