import type { PageLoad } from './$types';
import type { Prize } from '$lib/types';
import { capitalizeFirstLetter } from '$lib/utils';

// Since this is a full static project, we do this client side - but
// this can be done in +page.server.ts as well (SSR / NodeJS hosting)

export const load: PageLoad = async ({ fetch }) => {
	// Data retrieved from http://api.nobelprize.org/v1/prize.json,
	// we copied the dataset to static/ because of privacy
	const response = await fetch('/prizes.json');
	const json = await response.json();
	const prizes: Prize[] = json.prizes;

	// Use a Set to store unique years and categories
	const yearsSet = new Set<string>();
	const categoriesSet = new Set<string>();

	// Loop through the prizes and collect years and categories
	prizes.forEach((prize) => {
		yearsSet.add(prize.year);
		categoriesSet.add(prize.category);
	});

	// Convert yearsSet to an array of objects { label: "Year", value: "year" }
	const availableYears = Array.from(yearsSet).map((year) => ({
		label: year, // Year is the same for label and value
		value: year
	}));

	// Convert categoriesSet to an array of objects { label: "CATEGORY", value: "category" }
	// Uppercase the label for categories
	const availableCategories = Array.from(categoriesSet).map((category) => ({
		label: capitalizeFirstLetter(category),
		value: category
	}));

	return {
		prizes,
		// data for UI filters:
		availableYears,
		availableCategories
	};
};
