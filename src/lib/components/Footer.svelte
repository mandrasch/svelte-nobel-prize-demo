<footer>
	<div class="footer-grid">
		<div class="col col-title" style="text-align:left;">
			<p style="font-weight:bold;">Demo project with Svelte v5, SvelteKit and Simple.css ✨</p>
		</div>

		<div class="col col-infos">
			<p>Data source: https://api.nobelprize.org/v1/prize.json</p>
			<p>
				Source Code: <a href="https://github.com/mandrasch/svelte-nobel-prize-demo">GitHub</a>
			</p>
			<p>
				Created by <a href="https://mandrasch.dev">Matthias Andrasch</a> with support from the fantastic
				Svelte community.
			</p>
			<p>
				This site doesn't process any personal data.
				<a href="https://matthias-andrasch.eu/impressum-datenschutz/">Imprint & Privacy</a>
			</p>
		</div>

		<div class="col col-links"></div>

		<div class="col"></div>
	</div>
</footer>

<style lang="css">
	footer {
		/* simple css has grid on body, span to full grid size */
		grid-column: 1 / -1;
		container-type: inline-size;
		container-name: footer;
		padding: 20px;
		justify-content: center;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
		/*column-gap: 1rem; // doesn't work with border approach*/
		row-gap: 0.2rem;

		justify-content: center;

		max-width: 900px;
		margin: 0 auto;

		/* important for borders between cols */
		overflow: hidden;
	}

	/* Container query for mobile */
	@container footer (max-width: 480px) {
		.footer-grid {
			grid-template-columns: 1fr; /* Stack items in one column on mobile */
		}
	}

	.footer-grid .col {
		padding: 0 1rem 0 1rem;
		/* for border between grid cols */
		position: relative;
	}

	/* border between grid cols, https://blog.jobins.jp/how-to-set-border-lines-on-a-css-grid-layout */
	.footer-grid .col::before,
	.footer-grid .col::after {
		content: '';
		position: absolute;
		background-color: none; /* set this to add border */
		z-index: 1;
	}
	/* add border between grid cols */
	.footer-grid .col::before {
		width: 1px;
		block-size: 100vh;
		left: -1px;
		top: 0;
	}

	.col-title {
		grid-column: 1 / -1; /*span to full with */
	}

	.col-infos {
		text-align: left;
	}

	.col-links {
		text-align: center;
		padding-left: 40px;
		padding-right: 40px;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* style link list */
	p.jobBoards-intro {
		margin-bottom: 0.4rem;
	}
	ul.jobBoards {
		padding-inline-start: 20px;
		align-self: center;
	}
	ul.jobBoards li {
		text-align: left;
	}
</style>
