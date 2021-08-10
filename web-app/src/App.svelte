<script lang="ts">
	import { items, getItems } from './store/items';
	import { router } from './router';
	import Item from './components/Item.svelte';

	let userId = $router?.params['userId'] ?? '';
	$: if(userId) getItems(userId);
</script>

<main>
	<h1>Hey</h1>
		<p>{userId}</p>
		<ul>
			{#each $items as item}
				<Item {item} />
			{/each}
		</ul>
</main>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
