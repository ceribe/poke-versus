<script>
	import { availablePokemon, isInBattle, myPokemon } from '../stores/dataStore';
	import PokemonCard from '../components/pokemonCard.svelte';
</script>

<div class="flex flex-col items-center">
	<div class="grid gap-4 grid-cols-5 py-4 w-[65rem]">
		{#each availablePokemon as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</div>
	<button
		class="bg-blue-400 text-white pl-10 pr-10 pt-4 pb-4 rounded-3xl font-semibold text-2xl m-4 disabled:bg-gray-500 disabled:text-gray-700"
		on:click={() => isInBattle.set(true)}
		disabled={$myPokemon.length != 3}
	>
		Start
	</button>
	<h1>Picked {$myPokemon.length}/3</h1>
</div>
