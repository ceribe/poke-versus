<script>
	import { availablePokemon, myPokemon } from '../stores/dataStore';
	import PokemonCard from '../components/pokemonCard.svelte';
</script>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>
<div class="bg-blue-300 horiz flex content-center">
	<img src="src/pokeball.png" alt="logo" class="h-12 w-11 ml-2 mt-2 mb-2" />
	<h1 class="text-2xl uppercase p-4 text-white font-semibold">Poké Versus</h1>
</div>

<div class="flex flex-col items-center">
	<div class="grid gap-4 grid-cols-5 py-4 w-[65rem]">
		{#each availablePokemon as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</div>
	<button class="bg-blue-300 pl-10 pr-10 pt-4 pb-4 rounded-3xl font-semibold text-2xl m-4">
		Start
	</button>
	<h1>Picked {$myPokemon.length}/3</h1>
</div>
