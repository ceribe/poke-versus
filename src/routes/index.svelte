<script>
	import { availablePokemon } from '../stores/dataStore';
</script>

<h1>Poké Versus</h1>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>

<div class="grid-container" id="grid">
	{#each availablePokemon as pokemon}
		<div class="grid-item">
			<img
				src="https://img.pokemondb.net/sprites/diamond-pearl/normal/{pokemon.toLowerCase()}.png"
				alt={pokemon}
			/>
			{pokemon}
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 190px 190px 190px 190px;
		padding: 50px;
		justify-content: center;
		align-items: center;
	}

	.grid-item {
		background-color: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.8);
		padding: 20px;
		font-size: 30px;
		text-align: center;
	}
</style>
