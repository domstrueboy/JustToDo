<script lang="ts">
  import type { IItem } from '../models/item';
  export let item: IItem;
</script>

<li>
	<h3>{item.title ?? 'Unknown title'}</h3>
	<p>{item.description ?? ''}</p>
</li>

<style>
  li {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid whitesmoke;
    margin-top: 10px;
  }
  h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
    margin: 0;
	}
  p {
    margin: 0;
  }
</style>
