# Svelte Nobel Prize Demo

Search & filter demo with Svelte v5 & SvelteKit🧙

Demo: https://svelte-nobel-prize-demo.pages.dev

Static site generation via [adapter-static](https://svelte.dev/docs/kit/adapter-static).

## Why?

I like sites such as https://devjobs.at/teams/search, but I think they can be improved with a more "stack-focused" user interface for web developers. Since I wanted to learn the new $state system of Svelte v5 anyway, I started by implementing this. One of the goals is to show how simple a reactive user interface can be implemented with Svelte.

## Data sources

- http://api.nobelprize.org/v1/prize.json

## Resources

Thanks very much to https://simplecss.org/ and the Svelte Community for answering questions!

### Notes and discussions

- [Svelte 5: Share state between components (for Dummies) (dev.to)](https://dev.to/mandrasch/svelte-5-share-state-between-components-for-dummies-4gd2)
- [Feedback regarding $effect and URL params (Bluesky)](https://bsky.app/profile/paolo.ricciuti.me/post/3lf4a7rwjrc2h)
- [Help with simple pagination and $state (Discord)](https://discord.com/channels/457912077277855764/1325805139126386699)
- [Import shared $state and use bind=group for checkboxes inside of components (v5)? (Discord)](https://discord.com/channels/457912077277855764/1325055109318709278)
- [How to properly update query param on text input without losing focus/lag? (Discord)](https://discord.com/channels/457912077277855764/1326399049988964426)
- [What's the simplest most battle-tested way to communicate events/data across components in svelte5?](https://discord.com/channels/457912077277855764/1326440493529170002)

### Further resources

- [SikandarJODD/youva - Pagination | Debounce Search | Sort & Filters](https://github.com/SikandarJODD/youva)
- [Lets Build A Filtering System with Svelte 5 , Sveltekit 2, Tailwind, Upstash (2024) - Lawal Adebola](https://www.youtube.com/watch?v=5urk4ui_l5o)

## TODOs

- [ ] scroll to results after pagination click (where is the best place for this logic?)
- [ ] improve pagination (styling and page count)
