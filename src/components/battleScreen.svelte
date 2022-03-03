<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
	import { availablePokemon } from '../stores/pokedex';
	import { writable } from 'svelte/store';
	import { myPokemons } from '../stores/dataStore';

	const mtlLoader = new MTLLoader();
	let models1 = writable(new Map());
	let models2 = writable(new Map());
	let arenaModel = writable();
	export let myPokemon = writable($myPokemons[0]);
	export let opPokemon = writable(availablePokemon[16]);

	for (const pokemon of availablePokemon) {
		mtlLoader.load(`models/${pokemon.name}/${pokemon.name}.mtl`, function (materials) {
			materials.preload();
			const loader = new OBJLoader();
			loader.setMaterials(materials);
			loader.load(`models/${pokemon.name}/${pokemon.name}.obj`, (object) => {
				object.castShadow = true;
				$models1.set(pokemon.name, object);
				models1.set($models1);
			});
		});
	}

	//TODO Think of a better way to use the same object twice
	for (const pokemon of availablePokemon) {
		mtlLoader.load(`models/${pokemon.name}/${pokemon.name}.mtl`, function (materials) {
			materials.preload();
			const loader = new OBJLoader();
			loader.setMaterials(materials);
			loader.load(`models/${pokemon.name}/${pokemon.name}.obj`, (object) => {
				object.castShadow = true;
				$models2.set(pokemon.name, object);
				models2.set($models2);
			});
		});
	}

	mtlLoader.load('models/Arena/Arena.mtl', function (materials) {
		materials.preload();
		const loader = new OBJLoader();
		loader.setMaterials(materials);
		loader.load('models/Arena/Arena.obj', (object) => {
			object.receiveShadow = true;
			arenaModel.set(object);
		});
	});
</script>

<SC.Canvas antialias background={new THREE.Color('papayawhip')} shadows>
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
	<SC.DirectionalLight intensity={0.3} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>
