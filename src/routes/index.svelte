<script>
	import BattleScreen from '../components/battleScreen.svelte';
	import { isInBattle } from '../stores/dataStore';

	import TeamSelection from '../components/teamSelection.svelte';
</script>

<svelte:head>
	<title>Poké Versus</title>
</svelte:head>
<div class="bg-blue-400 horiz flex content-center">
	<img src="static/pokeball.png" alt="logo" class="h-12 w-11 ml-2 mt-2 mb-2" />
	<h1 class="text-2xl uppercase p-4 text-white font-semibold">Poké Versus</h1>
</div>

{#if $isInBattle}
	<BattleScreen />
{:else}
	<TeamSelection />
{/if}
