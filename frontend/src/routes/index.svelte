<script>
	import BattleScreen from '../components/battleScreen.svelte';
	import { isInBattle } from '../stores/gameState';
	import TeamSelection from '../components/teamSelection.svelte';
	import { onMount } from 'svelte';
	import { loadModels } from '../stores/models';

	onMount(async () => {
		loadModels();
	});
</script>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>

{#if $isInBattle}
	<BattleScreen />
{:else}
	<TeamSelection />
{/if}
