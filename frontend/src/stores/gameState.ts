import { reconnectToGame } from 'src/communication/connectionHandler';
import { writable, type Writable } from 'svelte/store';
import type { Pokemon } from '../consts/pokedex';
import { getStore } from './utils';

export const myPokemons: Writable<Pokemon[]> = writable([]);
export const enemyPokemons: Writable<Pokemon[]> = writable([]);
export const isInBattle = writable(false);
export let gameID: number;
export let playerNumber: number;
export const isPlayerTurn = writable(false);
export const opponentLost = writable(false);
export const playerLost = writable(false);
export const isWaitingForOpponent = writable(false);

export function saveGameState() {
	if (isInBattle) {
		localStorage.setItem('myPokemons', JSON.stringify(getStore(myPokemons)));
		localStorage.setItem('enemyPokemons', JSON.stringify(getStore(enemyPokemons)));
		localStorage.setItem('gameID', JSON.stringify(gameID));
		localStorage.setItem('playerNumber', JSON.stringify(playerNumber));
		localStorage.setItem('isPlayerTurn', JSON.stringify(getStore(isPlayerTurn)));
		localStorage.setItem('isSaved', JSON.stringify(true));
	} else {
		localStorage.removeItem('myPokemons');
		localStorage.removeItem('enemyPokemons');
		localStorage.removeItem('gameID');
		localStorage.removeItem('playerNumber');
		localStorage.removeItem('isPlayerTurn');
		localStorage.removeItem('isSaved');
	}
}

export function restoreGameState() {
	if (localStorage.getItem('isSaved')) {
		myPokemons.set(JSON.parse(localStorage.getItem('myPokemons')));
		enemyPokemons.set(JSON.parse(localStorage.getItem('enemyPokemons')));
		gameID = JSON.parse(localStorage.getItem('gameID'));
		playerNumber = JSON.parse(localStorage.getItem('playerNumber'));
		isPlayerTurn.set(JSON.parse(localStorage.getItem('isPlayerTurn')));
		isInBattle.set(true);

		reconnectToGame();
	}
}
