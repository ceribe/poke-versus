import { gameID, playerNumber } from '../stores/gameState';
import type { Pokemon } from '../consts/pokedex';

let websocket: WebSocket;

function onMessage(event: MessageEvent) {
	console.log(event.data);
	// TODO Handle Opponent Joined
	// TODO Handle Receive Damage
}

function initializeConnection() {
	websocket = new WebSocket('ws://localhost:8128/pv');
	websocket.binaryType = 'arraybuffer';
	websocket.onmessage = onMessage;
}

export function joinGame(pokemons: Pokemon[]) {
	initializeConnection();
	sendJoinGameMessage(pokemons);
}

export function reconnectToGame() {
	initializeConnection();
	sendReconnectMessage();
}

export function sendJoinGameMessage(pokemons: Pokemon[]) {
	const msg = new ArrayBuffer(4);
	const view = new DataView(msg);
	view.setInt8(0, 0);
	view.setInt8(1, pokemons[0].id);
	view.setInt8(2, pokemons[1].id);
	view.setInt8(3, pokemons[2].id);

	websocket.send(msg);
}

export function sendAttackMessage(damageAmount: number, isGameOver: boolean) {
	const msg = new ArrayBuffer(5);
	const view = new DataView(msg);
	view.setInt8(0, 2);
	view.setInt8(1, gameID);
	view.setInt8(2, damageAmount);
	if (isGameOver) {
		view.setInt8(3, 1);
	} else {
		view.setInt8(3, 0);
	}
	view.setInt8(4, playerNumber);

	websocket.send(msg);
}

export function sendReconnectMessage() {
	const msg = new ArrayBuffer(3);
	const view = new DataView(msg);
	view.setInt8(0, 4);
	view.setInt8(1, playerNumber);
	view.setInt8(2, gameID);

	websocket.send(msg);
}
