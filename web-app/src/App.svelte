<script lang="ts">
	import { router } from './router';
	import { client } from './client';

	async function getItems() { // rewrite to subscribe (in stores)
		let { data: items, error } = await client.from('items').select('title, content').eq('user_id', $router?.params['userId'] ?? '');

		if (items) {
			return items;
		} else {
			throw new Error(`${error}`);
		}
	}

	let promise = getItems();

	export let name: string;
</script>

<main>
	<h1>Hello {$router?.params['userId']}!</h1>
	{#await promise}
		<p>...waiting</p>
	{:then items}
		{#each items as item}
			<li>
				<h3>{item.title}</h3>
				<p>{item.content}</p>
			</li>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
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
