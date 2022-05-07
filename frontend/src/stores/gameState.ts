import { writable, type Writable } from 'svelte/store';
import type { Pokemon } from '../consts/pokedex';

export const myPokemons: Writable<Pokemon[]> = writable([]);
export const isInBattle = writable(false);
