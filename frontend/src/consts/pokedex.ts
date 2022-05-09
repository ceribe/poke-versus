// Returns a copy of pokemon with given id.
export function getPokemonById(id: number): Pokemon {
	return Object.assign({}, availablePokemon[id]);
}

// Returns amount of damage that given attack will do when executed by given attackingPokemon on given defendingPokemon.
// The formula used is not real. I just made it up and fixed a few times to make it balanced.
export function calculateDamage(
	attack: Attack,
	attackingPokemon: Pokemon,
	defendingPokemon: Pokemon
): number {
	let multiplier = (attackingPokemon.attack - defendingPokemon.defense + 100) / 200.0;
	multiplier = Math.min(Math.max(multiplier, 0.2), 2);
	let damage = Math.sqrt(multiplier) * attack.power;

	damage /= 2;
	if (attackingPokemon.type1 === attack.type || attackingPokemon.type2 === attack.type) {
		damage *= 1.5;
	}
	damage = damage * multipliers[attack.type][defendingPokemon.type1];
	if (defendingPokemon.type2 !== Type.None) {
		damage *= multipliers[attack.type][defendingPokemon.type2];
	}
	if (damage > 255) damage = 255;
	return Math.ceil(damage);
}

export enum Type {
	Normal,
	Fighting,
	Flying,
	Poison,
	Ground,
	Rock,
	Bug,
	Ghost,
	Steel,
	Fire,
	Water,
	Grass,
	Electric,
	Psychic,
	Ice,
	Dragon,
	Dark,
	Fairy,
	None
}

// Matrix of type effectivness. Types are in the same order as in the Type enum.
const multipliers = [
	[1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
	[2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
	[1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
	[1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
	[1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
	[1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
	[1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5],
	[0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1],
	[1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
	[1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
	[1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
	[1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
	[1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
	[1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
	[1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
	[1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
	[1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1]
];

export const typeColors = new Map<Type, string>([
	[Type.Grass, 'bg-green-500'],
	[Type.Fire, 'bg-orange-500'],
	[Type.Water, 'bg-blue-500'],
	[Type.Poison, 'bg-purple-600'],
	[Type.Flying, 'bg-indigo-500'],
	[Type.Ice, 'bg-cyan-300'],
	[Type.Ghost, 'bg-purple-900'],
	[Type.Steel, 'bg-gray-400'],
	[Type.Normal, 'bg-stone-500'],
	[Type.Fighting, 'bg-red-800'],
	[Type.Psychic, 'bg-pink-500'],
	[Type.Dragon, 'bg-violet-700'],
	[Type.Fairy, 'bg-pink-300'],
	[Type.Dark, 'bg-stone-700'],
	[Type.Rock, 'bg-amber-500'],
	[Type.Electric, 'bg-yellow-500'],
	[Type.Ground, 'bg-amber-800']
]);

export interface Attack {
	name: string;
	power: number;
	type: Type;
}

export interface Pokemon {
	id: number;
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
		id: 0,
		name: 'Venusaur',
		health: 270,
		attack: 184,
		defense: 184,
		type1: Type.Grass,
		type2: Type.Poison,
		attacks: [
			{ name: 'Frenzy Plant', power: 150, type: Type.Grass },
			{ name: 'Sludge Bomb', power: 90, type: Type.Poison }
		]
	},
	{
		id: 1,
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
		id: 2,
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
		id: 3,
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
		id: 4,
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
		id: 5,
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
		id: 6,
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
		id: 7,
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
		id: 8,
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
		id: 9,
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
		id: 10,
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
		id: 11,
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
	},
	{
		id: 12,
		name: 'Lugia',
		health: 322,
		attack: 166,
		defense: 281,
		type1: Type.Psychic,
		type2: Type.Flying,
		attacks: [
			{ name: 'Aeroblast', power: 100, type: Type.Flying },
			{ name: 'Future Sight', power: 120, type: Type.Psychic }
		]
	},
	{
		id: 13,
		name: 'Blaziken',
		health: 270,
		attack: 292,
		defense: 148,
		type1: Type.Fire,
		type2: Type.Fighting,
		attacks: [
			{ name: 'Blaze Kick', power: 85, type: Type.Fire },
			{ name: 'Close Combat', power: 120, type: Type.Fighting }
		]
	},
	{
		id: 14,
		name: 'Gardevoir',
		health: 246,
		attack: 229,
		defense: 221,
		type1: Type.Psychic,
		type2: Type.Fairy,
		attacks: [
			{ name: 'Dream Eater', power: 100, type: Type.Psychic },
			{ name: 'Dazzling Dream', power: 80, type: Type.Fairy }
		]
	},
	{
		id: 15,
		name: 'Kyogre',
		health: 310,
		attack: 274,
		defense: 256,
		type1: Type.Water,
		type2: Type.None,
		attacks: [
			{ name: 'Water Spout', power: 150, type: Type.Water },
			{ name: 'Thunderbolt', power: 90, type: Type.Electric }
		]
	},
	{
		id: 16,
		name: 'Groudon',
		health: 310,
		attack: 274,
		defense: 256,
		type1: Type.Ground,
		type2: Type.None,
		attacks: [
			{ name: 'Eruption', power: 150, type: Type.Fire },
			{ name: 'Precipice Blades', power: 120, type: Type.Ground }
		]
	},
	{
		id: 17,
		name: 'Rayquaza',
		health: 320,
		attack: 274,
		defense: 166,
		type1: Type.Dragon,
		type2: Type.Flying,
		attacks: [
			{ name: 'Dragon Ascent', power: 120, type: Type.Flying },
			{ name: 'Draco Meteor', power: 130, type: Type.Dragon }
		]
	},
	{
		id: 18,
		name: 'Garchomp',
		health: 326,
		attack: 238,
		defense: 175,
		type1: Type.Dragon,
		type2: Type.Ground,
		attacks: [
			{ name: 'Dragon Rush', power: 100, type: Type.Dragon },
			{ name: 'Earth Power', power: 80, type: Type.Ground }
		]
	},
	{
		id: 19,
		name: 'Glaceon',
		health: 240,
		attack: 238,
		defense: 202,
		type1: Type.Ice,
		type2: Type.None,
		attacks: [
			{ name: 'Blizzard', power: 110, type: Type.Ice },
			{ name: 'Dig', power: 80, type: Type.Ground }
		]
	}
];
