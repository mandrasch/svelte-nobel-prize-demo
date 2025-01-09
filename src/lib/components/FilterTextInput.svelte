<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// we need to use a special safe guard here with building, otherwise there will
	// "Error: Cannot access url.searchParams on a page with prerendering enabled"
	import { building } from '$app/environment';

	let { label = '' as string, searchParamsKey = '' as string, ...props } = $props();

	// We don't use bind:value= with shared state from parent components here, since it is
	// too complicated with query params & $effect https://bsky.app/profile/paolo.ricciuti.me/post/3lf464y4erc2h)

	// get initial state from url params
	let searchText = $derived.by(() => {
		return !building ? page.url.searchParams?.get(searchParamsKey) || '' : '';
	});

	// thx to Fabian for debound & keepFocus:true for goto!
	// (https://discord.com/channels/457912077277855764/1326399049988964426/1326402417230745620)
	// TODO: add types
	function debounce(func, delay) {
		let timeoutId;

		return function (...args) {
			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const debounceSearch = debounce(handleChange, 400);

	function handleChange(evt: Event) {
		const inputEl = evt.target as HTMLInputElement;

		// get current search params
		const newSearchParams = !building ? page.url.searchParams : new URLSearchParams();

		if (inputEl.value != '') {
			newSearchParams.set(searchParamsKey, inputEl.value);
		} else {
			newSearchParams.delete(searchParamsKey);
		}

		// TODO: find a clever solution for this to not do it in every function?
		// reset pagination, because there is a new result set
		newSearchParams.delete('p');

		// call new URL
		console.log('--- goto called ---', { newSearchParams: newSearchParams.toString() });

		// navigate, but keep focus within the search input
		goto(`?${newSearchParams.toString()}`, { keepFocus: true });
	}
</script>

<label>
	<input aria-label={label} type="text" value={searchText} onkeyup={debounceSearch} {...props} />
</label>

<style>
	label {
		margin-top: 10px;
	}
</style>
