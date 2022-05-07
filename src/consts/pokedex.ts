export enum Type {
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
	Rock,
	Electric,
	Ground
}

export interface Attack {
	name: string;
	power: number;
	type: Type;
}

export interface Pokemon {
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
	},
	{
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
