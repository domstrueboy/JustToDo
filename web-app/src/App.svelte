<script lang="ts">
	import { items, getItems } from './store/items';
	import { router } from './router';

	let userId = $router?.params['userId'] ?? '';
	$: getItems(userId);
</script>

<main>
	<h3>Hey</h3>
		<p>{userId}</p>
		<ul>
			{#each $items as item}
				<li>
					<h3>{item.title}</h3>
					<p>{item.content}</p>
				</li>
			{/each}
		</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
