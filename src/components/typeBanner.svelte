<script lang="ts">
	import { Type, typeColors } from '../consts/pokedex';

	export let type: Type;
</script>

<div
	class="{typeColors.get(
		type
	)} h-10 w-44 flex justify-center items-center text-white font-semibold text-lg rounded-xl border-4 border-black"
>
	{Type[type]}
</div>
