<script>
	import { myPokemons } from '../stores/gameState';
	import PokemonCard from './PokemonCard.svelte';
	import { availablePokemon } from '../consts/pokedex';
	import { joinGame } from '../communication/connectionHandler';
</script>

<div class="bg-blue-400 horiz flex content-center shadow-lg pl-4">
	<img src="/pokeball.png" alt="logo" class="h-12 w-11 ml-2 mt-2 mb-2" />
	<h1 class="text-2xl uppercase p-4 text-white font-semibold">Poké Versus</h1>
</div>

<div class="flex flex-col items-center">
	<div class="grid gap-4 grid-cols-5 py-4 w-[65rem]">
		{#each availablePokemon as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</div>
	<button
		class="bg-blue-400 text-white pl-10 pr-10 pt-4 pb-4 rounded-3xl font-semibold text-2xl m-4 disabled:bg-gray-500 disabled:text-gray-300"
		on:click={() => joinGame()}
		disabled={$myPokemons.length != 3}
	>
		Start
	</button>
	<h1>Picked {$myPokemons.length}/3</h1>
</div>
