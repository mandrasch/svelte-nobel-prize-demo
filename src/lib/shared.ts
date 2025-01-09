// TODO: we need to use this to validate JSON on build to check if there are invalid values
export const availableFilterValues = {
	phpCmses: [
		{ label: 'Craft CMS', value: 'CraftCMS' },
		{ label: 'Drupal', value: 'Drupal' },
		{ label: 'Kirby CMS', value: 'KirbyCMS' },
		{ label: 'TYPO3', value: 'TYPO3' },
		{ label: 'WordPress', value: 'WordPress' }
	],
	phpFrameworks: [
		{ label: 'Laravel', value: 'Laravel' },
		{ label: 'Symfony', value: 'Symfony' }
	],
	javascriptFrameworks: [
		{ label: 'Angular', value: 'Angular' },
		{ label: 'React', value: 'React' },
		{ label: 'Svelte', value: 'Svelte' },
		{ label: 'Vue', value: 'Vue' }
	],
	specialTags: [{ label: '4 day work week (or similiar)', value: 'fourDayWorkWeekOrSimiliar' }]
};
