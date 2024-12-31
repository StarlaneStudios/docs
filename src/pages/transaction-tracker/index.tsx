import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './transaction.module.css';

function TransactionTrackerHeader() {
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				{/* <img src="/img/logo.svg" alt="Logo" className={styles.logo} /> */}
				<h1 className="hero__title">Transaction Tracker</h1>
				<p className="hero__subtitle">A simple bill tracking system</p>
				<div className={styles.buttons}>
					<Link
						className="button button--primary button--lg"
						to="/transaction-tracker/installation"
					>
						Installation
					</Link>
				</div>
				<div className={styles.card}>
					A simple bill tracking system
				</div>
			</div>
		</header>
	);
}

export default function TransactionTracker(): Element {
	return (
		<Layout
			title="Transaction Tracker"
			description="A simple bill tracking system"
		>
			<TransactionTrackerHeader />
		</Layout>
	);
}
