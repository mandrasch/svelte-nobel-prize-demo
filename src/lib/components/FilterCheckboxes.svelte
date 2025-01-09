<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// we need to use a special safe guard here with building, otherwise there will
	// "Error: Cannot access url.searchParams on a page with prerendering enabled"
	import { building } from '$app/environment';

	let {
		labelsAndValues,
		// the URL param to update when selected values change
		searchParamsKey = '' as string,
		...props
	} = $props();

	// We don't use bind:group= with shared state from parent components here, since it is
	// too complicated with query params & $effect https://bsky.app/profile/paolo.ricciuti.me/post/3lf464y4erc2h)

	// get initial state from url params
	let selectedValues = $derived(
		!building ? page.url.searchParams?.get(searchParamsKey)?.split(',') || [] : []
	);

	function handleChange(evt: Event) {
		const inputEl = evt.target as HTMLInputElement;

		// get current search params and selected values
		const newSearchParams = !building ? page.url.searchParams : new URLSearchParams(); // TODO: $state.snapshot() necessary?
		let newSelectedValues = selectedValues; // TODO: $state.snapshot()  necessary?

		console.log({ checked: inputEl.checked });
		// update or remove item from array
		if (inputEl.checked) {
			newSelectedValues.push(inputEl.value);
		} else {
			newSelectedValues = newSelectedValues.filter((val) => val !== inputEl.value);
		}

		// serialize and add to URL (if there are selected values)
		if (newSelectedValues.length > 0) {
			newSearchParams.set(searchParamsKey, newSelectedValues.join(','));
		} else {
			newSearchParams.delete(searchParamsKey);
		}

		// TODO: find a clever solution for this to not do it in every function?
		// reset pagination, because there is a new result set
		newSearchParams.delete('p');

		// call new URL
		console.log('--- goto called ---', { newSearchParams: newSearchParams.toString() });
		goto(`?${newSearchParams.toString()}`); // TODO: use replace state?
	}
</script>

<div {...props}>
	{#each labelsAndValues as { label, value }}
		<label>
			<input
				type="checkbox"
				{value}
				checked={selectedValues.includes(value)}
				onchange={handleChange}
			/>
			{label}
		</label>
	{/each}
</div>
