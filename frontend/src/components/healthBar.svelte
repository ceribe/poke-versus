<script lang="ts">
	import { availablePokemon, type Pokemon } from '../consts/pokedex';

	export let pokemon: Pokemon;
	let healthPercentage: number;
	$: {
		healthPercentage = (pokemon.health / availablePokemon[pokemon.id].health) * 100;
	}
</script>

<div class="pl-10 pr-10">
	<div class="bg-slate-300 border-4 border-black p-2 rounded-lg w-52 flex items-center flex-col">
		<div class="font-bold pb-2 text-lg">
			{pokemon.name}
		</div>
		<div
			class="bg-gray-500 h-10 w-44 rounded-xl border-4 border-black flex justify-center items-center text-white font-semibold text-lg "
		>
			<div class="h-10 w-44 pt-1">
				<div class="bg-red-500 h-8 rounded-lg" style="width: {healthPercentage}%;" />
			</div>
			<div class="absolute">
				{pokemon.health} / {availablePokemon[pokemon.id].health}
			</div>
		</div>
	</div>
</div>
