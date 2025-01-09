<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { Prize } from '$lib/types';
	import { capitalizeFirstLetter } from '$lib/utils';

	// we need to use a special safe guard here with building, otherwise there will
	// "Error: Cannot access url.searchParams on a page with prerendering enabled"
	import { building } from '$app/environment';

	// all JSON prizes
	let { prizesData } = $props();

	// Listen for state changes
	// Apply the filters based on selected tags from all groups
	let results = $derived.by(() => {
		console.log('$derived.by triggered in <ResultList.svelte>, filter results...');

		// start fresh
		let filteredPrizes: Prize[] = [];
		filteredPrizes = prizesData;

		// very verbose here (again), but we keep it simple and readable here

		// Our source of thruth for state is building ? page.url.searchParams
		// TODO: move key names to const helper
		const selectedYears = !building ? page.url.searchParams.get('years')?.split(',') || [] : [];
		const selectedCategories = !building
			? page.url.searchParams.get('categories')?.split(',') || []
			: [];

		const selectedSearchText = !building ? page.url.searchParams.get('s') || '' : '';

		// helper var for reset filters button
		const isFilterSet = [
			selectedYears.length > 0,
			selectedCategories.length > 0,
			selectedSearchText !== ''
		].some(Boolean);

		const paginationState = {
			currentPage: parseInt(!building ? page.url.searchParams.get('p') || '1' : '1'),
			limit: 5
		};

		// Very verbose here, could be refactored - but keeping it simple here

		// stack tags
		// Filter based on selected years
		if (selectedYears.length > 0) {
			// Filter prizes where the year matches one of the selected years
			filteredPrizes = filteredPrizes.filter((prize: Prize) => selectedYears.includes(prize.year));
		}

		// Filter based on selected categories
		if (selectedCategories.length > 0) {
			// Filter prizes where the category matches one of the selected categories
			filteredPrizes = filteredPrizes.filter((prize: Prize) =>
				selectedCategories.includes(prize.category)
			);
		}
		// search text
		if (selectedSearchText !== '') {
			const searchTextLower = selectedSearchText.toLowerCase();
			filteredPrizes = filteredPrizes.filter((prize: Prize) => {
				// Check if the category matches the search text
				const categoryMatch = prize.category.toLowerCase().includes(searchTextLower);

				console.log({ l: prize.laureates });
				// Check if any laureate's firstname, surname, or motivation matches the search text
				const laureateMatch = prize.laureates?.some((laureate) => {
					const firstnameMatch = laureate.firstname.toLowerCase().includes(searchTextLower);
					const surnameMatch = laureate.surname?.toLowerCase().includes(searchTextLower); // optional field
					const motivationMatch = laureate.motivation.toLowerCase().includes(searchTextLower);

					return firstnameMatch || surnameMatch || motivationMatch;
				});

				// Return true if either the category or any laureate details match
				return categoryMatch || laureateMatch;
			});
		}

		// Filtering is done, let's paginate!
		const startIndex = (paginationState.currentPage - 1) * paginationState.limit;
		const paginatedPrizes = filteredPrizes.slice(startIndex, startIndex + paginationState.limit);

		return {
			prizes: paginatedPrizes,
			total: filteredPrizes.length,
			paginationState,
			isFilterSet
		};
	});

	function updateUrlForPaginationClick() {
		// Get the current search parameters from the URL,
		// set new current page for pagination
		const searchParams = !building ? page.url.searchParams : new URLSearchParams();
		searchParams.set('p', results.paginationState.currentPage.toString());
		goto(`?${searchParams.toString()}`);
	}

	function resetFilters() {
		goto(`/`);
	}
</script>

<div>
	<div class="resultCount">
		<p style="font-weight: bold;">
			{results.total} prizes found / Page: {results.paginationState.currentPage}
		</p>

		{#if results.isFilterSet}
			<div>
				<button in:fade={{ delay: 100 }} out:fade onclick={() => resetFilters()}
					>Reset filters</button
				>
			</div>
		{/if}
	</div>

	<div class="resultList">
		<!-- normally it would be best to add a key here like 'as prize (price.id)' , but this dataset doesn't have one -->
		{#each results.prizes as prize}
			<article>
				<h3>{capitalizeFirstLetter(prize.category)}</h3>

				<p>{prize.year}</p>

				{#if prize.laureates}
					<ul>
						{#each prize.laureates as laureate}
							<li>
								<p>{laureate.firstname} {laureate.surname}</p>
								<p>{laureate.motivation}</p>
							</li>
						{/each}
					</ul>
				{:else if prize.overallMotivation}
					<p>{prize.overallMotivation}</p>
				{/if}
			</article>
		{/each}
	</div>

	<div class="pagination">
		{#if results.paginationState.currentPage > 1}
			<button
				onclick={() => {
					results.paginationState.currentPage--;
					updateUrlForPaginationClick();
				}}>Previous</button
			>
		{/if}
		{#if results.paginationState.currentPage * results.paginationState.limit < results.total}
			<button
				onclick={() => {
					results.paginationState.currentPage++;
					updateUrlForPaginationClick();
				}}>Next</button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	article {
		h3 {
			margin-bottom: 0.5rem;
		}

		a {
			text-decoration: none;
		}

		p {
			margin: 0;
		}
	}
	.resultCount {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			font-size: 1rem;
		}
	}

	.pagination {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		padding-top: 1rem;
	}
</style>
