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
{:else if type == Type.Steel}
	<div
		class="bg-gray-400 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Steel
	</div>
{:else if type == Type.Normal}
	<div
		class="bg-stone-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Normal
	</div>
{:else if type == Type.Fighting}
	<div
		class="bg-red-800 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Fighting
	</div>
{:else if type == Type.Psychic}
	<div
		class="bg-pink-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Psychic
	</div>
{:else if type == Type.Dragon}
	<div
		class="bg-violet-700 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Dragon
	</div>
{:else if type == Type.Fairy}
	<div
		class="bg-pink-300 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Fairy
	</div>
{:else if type == Type.Dark}
	<div
		class="bg-stone-700 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Dark
	</div>
{:else if type == Type.Rock}
	<div
		class="bg-amber-500 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Rock
	</div>
{:else if type == Type.Electric}
	<div
		class="bg-yellow-300 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Electric
	</div>
{:else if type == Type.Ground}
	<div
		class="bg-amber-800 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
	>
		Ground
	</div>
{:else}
	<div class=" h-10 flex justify-center items-center text-white font-semibold text-lg rounded-xl" />
{/if}
