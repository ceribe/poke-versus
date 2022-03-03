<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
	import { availablePokemon } from '../stores/pokedex';
	import { writable } from 'svelte/store';

	const mtlLoader = new MTLLoader();
	let models = writable(new Map());
	let count = 0;
	for (const pokemon of availablePokemon) {
		mtlLoader.load(`models/${pokemon.name}/${pokemon.name}.mtl`, function (materials) {
			materials.preload();
			const loader = new OBJLoader();
			loader.setMaterials(materials);
			loader.load(`models/${pokemon.name}/${pokemon.name}.obj`, (object) => {
				object.position.x = count;
				count += 5;
				$models.set(pokemon.name, object);
				models.set($models);
			});
		});
	}
</script>

<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	{#each [...$models] as [_, value]}
		<SC.Primitive object={value} position={[0, 0, 0]} />
	{/each}
	<SC.AmbientLight intensity={1.9} />
	<SC.DirectionalLight intensity={0.3} position={[-2, 3, 2]} />
	<SC.PerspectiveCamera position={[0, 20, 40]} fov={75} near={0.1} far={1000} />
	<SC.OrbitControls enableZoom={true} />
</SC.Canvas>
