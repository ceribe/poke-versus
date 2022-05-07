<script lang="ts">
	import { isPlayerTurn } from 'src/stores/gameState';
	import type { Type } from '../consts/pokedex';
	import TypeBanner from './typeBanner.svelte';

	// TODO change to Attack
	export let type: Type;
	export let name: String;
</script>

<button>
	<div
		class="bg-slate-300 border-4 border-black p-2 rounded-lg w-52 flex items-center flex-col 
		{!isPlayerTurn ? 'invisible' : ''}"
	>
		<div class="font-bold pb-2 text-lg">
			{name}
		</div>
		<TypeBanner {type} />
	</div>
	<!-- TODO Add onclick which attacks oppoonent (gameState) which then sends message -->
</button>
