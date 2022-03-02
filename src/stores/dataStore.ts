import { writable } from 'svelte/store';

enum Type {
	None,
	Grass,
	Fire,
	Water,
	Poison,
	Flying,
	Ice,
	Ghost,
	Steel,
	Normal,
	Fighting,
	Psychic,
	Dragon,
	Fairy,
	Dark,
	Rock
}

interface Attack {
	name: string;
	power: number;
	type: Type;
}

interface Pokemon {
	name: string;
	health: number;
	attack: number;
	defense: number;
	type1: Type;
	type2: Type;
	attacks: Attack[];
}

export const availablePokemon: Pokemon[] = [
	{
		name: 'Venusaur',
		health: 270,
		attack: 184,
		defense: 184,
		type1: Type.Grass,
		type2: Type.Poison,
		attacks: [
			{ name: 'Frenzy Plant', power: 150, type: Type.Poison },
			{ name: 'Sludge Bomb', power: 90, type: Type.Poison }
		]
	},
	{
		name: 'Charizard',
		health: 266,
		attack: 200,
		defense: 157,
		type1: Type.Fire,
		type2: Type.Flying,
		attacks: [
			{ name: 'Blast Burn', power: 150, type: Type.Fire },
			{ name: 'Fly', power: 90, type: Type.Flying }
		]
	},
	{
		name: 'Blastoise',
		health: 268,
		attack: 157,
		defense: 193,
		type1: Type.Water,
		type2: Type.None,
		attacks: [
			{ name: 'Hydro Cannon', power: 150, type: Type.Water },
			{ name: 'Ice Beam', power: 90, type: Type.Ice }
		]
	},
	{
		name: 'Gengar',
		health: 230,
		attack: 238,
		defense: 139,
		type1: Type.Ghost,
		type2: Type.Poison,
		attacks: [
			{ name: 'Shadow Ball', power: 80, type: Type.Ghost },
			{ name: 'Sludge Wave', power: 95, type: Type.Poison }
		]
	},
	{
		name: 'Gyarados',
		health: 300,
		attack: 229,
		defense: 184,
		type1: Type.Water,
		type2: Type.Flying,
		attacks: [
			{ name: 'Aqua Tail', power: 90, type: Type.Water },
			{ name: 'Hurricane', power: 110, type: Type.Flying }
		]
	},
	{
		name: 'Vaporeon',
		health: 370,
		attack: 202,
		defense: 175,
		type1: Type.Water,
		type2: Type.None,
		attacks: [
			{ name: 'Hydro Pump', power: 110, type: Type.Water },
			{ name: 'Iron Tail', power: 100, type: Type.Steel }
		]
	},
	{
		name: 'Snorlax',
		health: 430,
		attack: 202,
		defense: 202,
		type1: Type.Normal,
		type2: Type.None,
		attacks: [
			{ name: 'Body Slam', power: 85, type: Type.Normal },
			{ name: 'Hammer Arm', power: 100, type: Type.Fighting }
		]
	},
	{
		name: 'Dragonite',
		health: 292,
		attack: 245,
		defense: 184,
		type1: Type.Dragon,
		type2: Type.Flying,
		attacks: [
			{ name: 'Outrage', power: 120, type: Type.Dragon },
			{ name: 'Hyper Beam', power: 150, type: Type.Normal }
		]
	},
	{
		name: 'Mewtwo',
		health: 322,
		attack: 281,
		defense: 166,
		type1: Type.Psychic,
		type2: Type.None,
		attacks: [
			{ name: 'Psystrike', power: 150, type: Type.Psychic },
			{ name: 'Focus Blast', power: 120, type: Type.Fighting }
		]
	},
	{
		name: 'Azumarill',
		health: 310,
		attack: 94,
		defense: 148,
		type1: Type.Water,
		type2: Type.Fairy,
		attacks: [
			{ name: 'Liqudation', power: 85, type: Type.Water },
			{ name: 'Play Rough', power: 90, type: Type.Fairy }
		]
	},
	{
		name: 'Umbreon',
		health: 300,
		attack: 121,
		defense: 238,
		type1: Type.Dark,
		type2: Type.None,
		attacks: [
			{ name: 'Dark Pulse', power: 80, type: Type.Dark },
			{ name: 'Last Resort', power: 140, type: Type.Normal }
		]
	},
	{
		name: 'Tyranitar',
		health: 310,
		attack: 245,
		defense: 202,
		type1: Type.Rock,
		type2: Type.Dark,
		attacks: [
			{ name: 'Stone Edge', power: 100, type: Type.Rock },
			{ name: 'Crunch', power: 80, type: Type.Dark }
		]
	}
	// 	{name: 'Lugia',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Blaziken',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Gardevoir',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Kyogre',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Groudon',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Rayquaza',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Garchomp',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
	// 	{name: 'Glaceon',
	// health: 000,
	// attack: 000,
	// defense: 000,
	// type1:,
	// type2:,
	// attacks: []},
];
export const myPokemon = writable([]);
export const isInBattle = writable(false);
