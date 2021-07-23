<script lang="ts">
	import { router } from './router';
	import { client } from './client';

	async function getItems() { // rewrite to subscribe (in stores)
		const response = await client.from('items').select('title, content').eq('user_id', $router?.params['userId'] ?? '');
		let { status, data: items, error } = response;

		if (status < 400) {
			return items;
		} else {
			throw new Error(error.message);
		}
	}

	let promise = getItems();
</script>

<main>
	{#await promise}
		<p>...waiting</p>
	{:then items}
		<ul>
			{#each items as item}
				<li>
					<h3>{item.title}</h3>
					<p>{item.content}</p>
				</li>
			{/each}
		</ul>
	{:catch errorMessge}
		<p style="color: red">{errorMessge}</p>
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
