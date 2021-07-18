<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/todos.json');

		if (res.ok) {
			const items = await res.json();

			return {
				props: { items }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">

	type Todo = {
		uid: string;
		created_at: Date;
		text: string;
		done: boolean;
	};

	export let todos: Todo[];

	async function patch(res: Response) {
		const todo = await res.json();

		todos = todos.map((t) => {
			if (t.uid === todo.uid) return todo;
			return t;
		});
	}
</script>

<svelte:head>
	<title>Events</title>
</svelte:head>

<div class="items">
	<h1>Events</h1>
	{#each todos as todo (todo.uid)}
		<div
			class="item"
		>
			{ todo.text }
		</div>
	{/each}
</div>

<style>
	.items {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.item {
		display: grid;
		grid-template-columns: 2rem 1fr 2rem;
		grid-gap: 0.5rem;
		align-items: center;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem;
		background-color: white;
		border-radius: 8px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
		transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
	}
</style>
