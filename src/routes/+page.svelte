<script lang="ts">
	import FilterCheckboxes from '$lib/components/FilterCheckboxes.svelte';
	import FilterTextInput from '$lib/components/FilterTextInput.svelte';
	import ResultList from '$lib/components/ResultList.svelte';

	// Import available values for stack tags, etc.
	import { availableFilterValues } from '$lib/shared';

	// Receive the company data from `load()` (via +page.ts)
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Our source of truth is the state of URL query param,
	// see ResultList.svelte and FilterCheckboxes.svelte

	// TODO: might be removed, tried to use it for scroll to results after navigation
	let resultListContainerEl: HTMLDivElement;
</script>

<div class="filters-container">
	<div class="filters">
		<div>
			<h3>Categories</h3>
			<FilterCheckboxes labelsAndValues={data.availableCategories} searchParamsKey="categories" />
		</div>
		<div>
			<h3>Year</h3>
			<FilterCheckboxes
				labelsAndValues={data.availableYears}
				searchParamsKey="years"
				style="max-height:150px; overflow-y:auto"
			/>
		</div>

		<div>
			<h3>Search Text</h3>
			<FilterTextInput label="Search for text" searchParamsKey="s" placeholder="Search term ..." />
		</div>
	</div>
</div>

<div bind:this={resultListContainerEl}>
	<ResultList prizesData={data.prizes} />
</div>

<style lang="scss">
	/* enable container queries */
	.filters-container {
		container-name: filtersContainer;
		container-type: inline-size;
		width: 100%;
	}

	.filters {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 1rem;
		row-gap: 1rem;

		h3 {
			font-size: 1rem;
			margin-top: 0.5rem;
		}

		/* special case */
		.cities {
			max-height: 150px;
			overflow: auto;
		}

		/* Container query for smaller containers */
		@container filtersContainer (max-width: 768px) {
			column-gap: 0.5rem;
			row-gap: 1rem;

			h3 {
				font-size: 0.9rem;
			}
		}

		/* Container query for very small containers */
		@container filtersContainer (max-width: 480px) {
			grid-template-columns: 1fr 1fr; /* Stack filters vertically */
			row-gap: 0.8rem;
			h3 {
				font-size: 0.85rem;
			}
		}
	}
</style>
