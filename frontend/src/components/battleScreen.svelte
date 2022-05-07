<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { availablePokemon } from '../consts/pokedex';
	import { writable } from 'svelte/store';
	import { myPokemons } from '../stores/gameState';
	import { models1, models2, arenaModel } from '../stores/models';
	import AttackButton from './attackButton.svelte';
	import HealthBar from './healthBar.svelte';

	export let myPokemon = writable($myPokemons[0]);
	export let opPokemon = writable(availablePokemon[16]);
</script>

<SC.Canvas antialias height={window.innerHeight}>
	<SC.Primitive
		object={$models1.get($myPokemon.name)}
		position={[0, 0, 15]}
		rotation={[0, -3.14, 0]}
	/>
	<SC.Primitive object={$models2.get($opPokemon.name)} position={[0, 0, -15]} />

	<SC.Primitive object={$arenaModel} scale={[5, 5, 5]} />
	<SC.PerspectiveCamera position={[25, 20, 25]} fov={75} near={0.1} far={1000} />
	<SC.OrbitControls
		enableZoom={true}
		maxPolarAngle={Math.PI * 0.41}
		minDistance={20}
		maxDistance={50}
		mouseButtons={{ RIGHT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, LEFT: THREE.MOUSE.LEFT }}
	/>
	<SC.AmbientLight intensity={1.9} />
	<SC.DirectionalLight intensity={0.3} position={[-2, 3, 2]} />
</SC.Canvas>

<div class="absolute bottom-0 w-full flex justify-center gap-1 items-end">
	<HealthBar pokemon={$myPokemon} />
	<AttackButton type={$myPokemon.attacks[0].type} name={$myPokemon.attacks[0].name} />
	<AttackButton type={$myPokemon.attacks[1].type} name={$myPokemon.attacks[1].name} />
	<HealthBar pokemon={$opPokemon} />
</div>
