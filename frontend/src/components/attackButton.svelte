<script lang="ts">
	import type { Type } from '../consts/pokedex';
	import TypeBanner from './typeBanner.svelte';

	export let type: Type;
	export let name: String;
</script>

<button>
	<div class="bg-slate-300 border-4 border-black p-2 rounded-lg w-52 flex items-center flex-col">
		<div class="font-bold pb-2 text-lg">
			{name}
		</div>
		<TypeBanner {type} />
	</div>
</button>
