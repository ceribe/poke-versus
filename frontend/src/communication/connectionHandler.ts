import { availablePokemon, getPokemonById } from '../consts/pokedex';
import {
	currentMyPokemonIndex,
	enemyPokemons,
	gameID,
	isInBattle,
	isPlayerTurn,
	isWaitingForOpponent,
	myPokemons,
	opponentLost,
	playerLost,
	playerNumber
} from '../stores/gameState';
import { getStore } from '../stores/utils';

let websocket: WebSocket;

function onMessage(event: MessageEvent) {
	console.log(event.data);
	const view = new DataView(event.data, 0);
	const messageType = view.getUint8(0);
	switch (messageType) {
		case 1:
			processOpponentJoinedMessage(view);
			break;
		case 3:
			processReceiveDamageMessage(view);
			break;
	}
}

export function initializeConnection() {
	websocket = new WebSocket('ws://localhost:8128/pv');
	websocket.binaryType = 'arraybuffer';
	websocket.onmessage = onMessage;
}

export function joinGame() {
	sendJoinGameMessage();
}

export function reconnectToGame() {
	sendReconnectMessage();
}

function sendJoinGameMessage() {
	isWaitingForOpponent.set(true);
	const pokemons = getStore(myPokemons);
	const msg = new ArrayBuffer(4);
	const view = new DataView(msg);
	view.setUint8(0, 0);
	view.setUint8(1, pokemons[0].id);
	view.setUint8(2, pokemons[1].id);
	view.setUint8(3, pokemons[2].id);

	websocket.send(msg);
}

function processOpponentJoinedMessage(view: DataView) {
	gameID.set(view.getUint8(4));
	playerNumber.set(view.getUint8(5));
	if (getStore(playerNumber) === 1) {
		isPlayerTurn.set(true);
		console.log("I'm first");
	}

	const firstPokemonID = view.getUint8(1);
	const secondPokemonID = view.getUint8(2);
	const thirdPokemonID = view.getUint8(3);
	const firstPokemon = getPokemonById(firstPokemonID);
	const secondPokemon = getPokemonById(secondPokemonID);
	const thirdPokemon = getPokemonById(thirdPokemonID);
	enemyPokemons.set([firstPokemon, secondPokemon, thirdPokemon]);

	isWaitingForOpponent.set(false);
	isInBattle.set(true);
}

export function sendAttackMessage(damageAmount: number) {
	const msg = new ArrayBuffer(5);
	const view = new DataView(msg);
	view.setUint8(0, 2);
	view.setUint8(1, getStore(gameID));
	view.setUint8(2, damageAmount);
	const isGameOver = getStore(opponentLost);
	if (isGameOver) {
		view.setUint8(3, 1);
	} else {
		view.setUint8(3, 0);
	}
	view.setUint8(4, getStore(playerNumber));

	websocket.send(msg);
}

function processReceiveDamageMessage(view: DataView) {
	const damageAmount = view.getUint8(1);
	const pokemonIndex = getStore(currentMyPokemonIndex);
	const pokemon = getStore(myPokemons)[pokemonIndex];
	pokemon.health -= damageAmount;
	console.log(damageAmount);
	console.log(pokemon);
	console.log(getStore(myPokemons));
	// Update state
	myPokemons.set(getStore(myPokemons));
	if (pokemon.health <= 0) {
		if (pokemonIndex === 2) {
			playerLost.set(true);
		} else {
			currentMyPokemonIndex.set(pokemonIndex + 1);
		}
	}
	isPlayerTurn.set(true);
}

function sendReconnectMessage() {
	const msg = new ArrayBuffer(3);
	const view = new DataView(msg);
	view.setUint8(0, 4);
	view.setUint8(1, getStore(playerNumber));
	view.setUint8(2, getStore(gameID));

	websocket.send(msg);
}
