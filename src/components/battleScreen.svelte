<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	onMount(async () => {
		const scene = new THREE.Scene();

		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#bg')
		});

		camera.position.setZ(30);

		const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
		const torus = new THREE.Mesh(geometry, material);
		scene.add(torus);
		function render() {
			requestAnimationFrame(render);
			torus.rotation.y += 0.011;
			renderer.render(scene, camera);
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.position.setZ(30);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize((window.innerWidth / 4) * 3, (window.innerHeight / 4) * 3);
		}
		render();
	});
</script>

<canvas id="bg" />
sdfsd
