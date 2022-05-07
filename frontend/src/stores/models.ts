import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { writable, type Writable } from 'svelte/store';
import { availablePokemon } from '../consts/pokedex';

const mtlLoader = new MTLLoader();
export const models1 = writable(new Map());
export const models2 = writable(new Map());
export const arenaModel: Writable<THREE.Object3D<THREE.Event>> = writable();

export function loadModels() {
	const tmpModels1 = new Map();
	const tmpModels2 = new Map();
	for (const pokemon of availablePokemon) {
		mtlLoader.load(`/models/${pokemon.name}/${pokemon.name}.mtl`, function (materials) {
			materials.preload();
			const loader = new OBJLoader();
			loader.setMaterials(materials);
			loader.load(`/models/${pokemon.name}/${pokemon.name}.obj`, (object) => {
				object.castShadow = true;
				tmpModels1.set(pokemon.name, object);
				models1.set(tmpModels1);
			});
		});
	}

	//TODO Think of a better way to use the same object twice
	for (const pokemon of availablePokemon) {
		mtlLoader.load(`/models/${pokemon.name}/${pokemon.name}.mtl`, function (materials) {
			materials.preload();
			const loader = new OBJLoader();
			loader.setMaterials(materials);
			loader.load(`/models/${pokemon.name}/${pokemon.name}.obj`, (object) => {
				object.castShadow = true;
				tmpModels2.set(pokemon.name, object);
				models2.set(tmpModels2);
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
}
