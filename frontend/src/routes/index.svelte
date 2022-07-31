<script>
	import BattleScreen from '../components/BattleScreen.svelte';
	import {
		clearGameState,
		isInBattle,
		isReconnecting,
		isWaitingForOpponent,
		opponentLost,
		playerLost,
	} from '../stores/gameState';
	import TeamSelection from '../components/TeamSelection.svelte';
	import { onMount } from 'svelte';
	import { loadModels } from '../stores/models';
	import { initializeConnection } from '../communication/connectionHandler';

	onMount(async () => {
		loadModels();
		initializeConnection();
	});
</script>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>

{#if $isReconnecting}
	<div
		class="bg-teal-500 text-white font-bold text-4xl p-4 w-screen h-screen flex justify-center items-center"
	>
		Reconnecting
	</div>
{:else if $isInBattle}
	{#if $playerLost}
		<button
			class="bg-red-400 text-white font-bold text-4xl p-4 w-screen h-screen flex justify-center items-center"
			on:click={() => clearGameState()}
		>
			You lost!
		</button>
	{:else if $opponentLost}
		<button
			class="bg-green-400 text-white font-bold text-4xl p-4 w-screen h-screen flex justify-center items-center"
			on:click={() => clearGameState()}
		>
			You won!
		</button>
	{:else}
		<BattleScreen />
	{/if}
{:else if $isWaitingForOpponent}
	<div
		class="bg-blue-500 text-white font-bold text-4xl p-4 w-screen h-screen flex justify-center items-center"
	>
		Waiting for opponent...
	</div>
{:else}
	<TeamSelection />
{/if}
