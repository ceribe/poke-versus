<script lang="ts">
	import type { Pokemon } from '../consts/pokedex';

	import { myPokemons } from '../stores/gameState';

	export let pokemon: Pokemon;

	function addToMyPokemon() {
		if ($myPokemons.length < 3) {
			myPokemons.set([...$myPokemons, pokemon]);
		} else {
			alert('You can pick only 3 pokémon.');
		}
	}

	function removeFromMyPokemon() {
		myPokemons.set([...$myPokemons.filter((pk) => pk != pokemon)]);
	}
</script>

{#if $myPokemons.includes(pokemon)}
	<button
		class="p-4 bg-blue-400 text-gray-800 text-center rounded-3xl shadow-sm hover:shadow-md flex flex-col items-center w-50 select-none"
		on:click={removeFromMyPokemon}
	>
		<img
			src="https://img.pokemondb.net/sprites/diamond-pearl/normal/{pokemon.name.toLowerCase()}.png"
			alt={pokemon.name}
			class="h-24 select-none"
		/>
		<h2 class="font-semibold text-lg select-none">
			{pokemon.name}
		</h2>
	</button>
{:else}
	<button
		class="p-4 bg-gray-200 text-gray-800 text-center rounded-3xl shadow-sm hover:shadow-md flex flex-col items-center w-50"
		on:click={addToMyPokemon}
	>
		<img
			src="https://img.pokemondb.net/sprites/diamond-pearl/normal/{pokemon.name.toLowerCase()}.png"
			alt={pokemon.name}
			class="h-24"
		/>
		<h2 class="font-semibold text-lg">
			{pokemon.name}
		</h2>
	</button>
{/if}
