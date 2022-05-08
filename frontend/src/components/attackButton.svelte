<script lang="ts">
	import { doAttack, isPlayerTurn } from '../stores/gameState';
	import type { Attack, Type } from '../consts/pokedex';
	import TypeBanner from './typeBanner.svelte';

	export let attack: Attack;
</script>

<button
	on:click={() => (!isPlayerTurn ? doAttack(attack) : 0)}
	class={!isPlayerTurn ? 'opacity-30' : ''}
>
	<div class="bg-slate-300 border-4 border-black p-2 rounded-lg w-52 flex items-center flex-col">
		<div class="font-bold pb-2 text-lg">
			{attack.name}
		</div>
		<TypeBanner type={attack.type} />
	</div>
</button>
