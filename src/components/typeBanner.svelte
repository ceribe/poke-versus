<script lang="ts">
	import { Type } from '../stores/pokedex';

	export let type: Type;
</script>

{#if type == Type.Grass}
	<div
		class="bg-green-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Grass
	</div>
{:else if type == Type.Fire}
	<div
		class="bg-orange-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Fire
	</div>
{:else if type == Type.Water}
	<div
		class="bg-blue-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Water
	</div>
{:else if type == Type.Poison}
	<div
		class="bg-purple-600 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Poison
	</div>
{:else if type == Type.Ice}
	<div
		class="bg-cyan-300 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Ice
	</div>
{:else if type == Type.Ghost}
	<div
		class="bg-purple-900 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Ghost
	</div>
{:else}
	<div class=" h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl" />
{/if}

<!-- None,

Steel,
Normal,
Fighting,
Psychic,
Dragon,
Fairy,
Dark,
Rock,
Electric,
Ground 
-->
