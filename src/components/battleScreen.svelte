<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { availablePokemon } from '../stores/pokedex';
	import { writable } from 'svelte/store';
	import { myPokemons } from '../stores/dataStore';
	import { models1, models2, arenaModel } from '../stores/models';

	export let myPokemon = writable($myPokemons[0]);
	export let opPokemon = writable(availablePokemon[16]);
</script>

<div>
	<SC.Canvas antialias height={window.innerHeight} pixelRatio={0.75}>
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
</div>
