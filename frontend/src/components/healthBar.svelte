<script lang="ts">
	import { availablePokemon, type Pokemon } from '../consts/pokedex';

	export let pokemon: Pokemon;
</script>

<div class="pl-10 pr-10">
	<div class="bg-slate-300 border-4 border-black p-2 rounded-lg w-52 flex items-center flex-col">
		<div class="font-bold pb-2 text-lg">
			{pokemon.name}
		</div>
		<div
			class="bg-red-500 h-10 w-44 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
		>
			{pokemon.health} / {availablePokemon[pokemon.id].health}
		</div>
	</div>
</div>
