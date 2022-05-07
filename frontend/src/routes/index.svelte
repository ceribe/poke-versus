<script>
	import BattleScreen from '../components/battleScreen.svelte';
	import { isInBattle, restoreGameState } from '../stores/gameState';
	import TeamSelection from '../components/teamSelection.svelte';
	import { onMount } from 'svelte';
	import { loadModels } from '../stores/models';

	onMount(async () => {
		loadModels();
		restoreGameState();
	});
</script>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>

{#if $isInBattle}
	<BattleScreen />
	<!-- TODO Add screen showing that player won/lost. After clicking player should be redirected to mainscreen and gamestate removed -->
{:else}
	<TeamSelection />
	<!-- TODO Show overlay while waiting for opponent -->
{/if}
