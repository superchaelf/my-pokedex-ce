import { IPokemon, IResultsPokemon } from "../pokemon/pokemon";

export interface ISprites {
    front_default : string;
    front_shiny : string;
}

export interface IAbility {
    ability : IResultsPokemon;
}

export interface ITypes {
    type : IResultsPokemon;
}


export interface IPokemonDetail {
    id : number;
    name : string;
    weight : number;
    height : number;
    abilities : IAbility[];
    sprites : ISprites;
    base_experience : number;
    types : ITypes[];
    disabledCatch? : boolean;
    disabledWish? : boolean;
}


export class PokemonDetail implements IPokemonDetail{
    id : number;
    name: string;
    weight: number;
    height: number;
    abilities: IAbility[];
    sprites : ISprites;
    base_experience : number;
    types : ITypes[];
    disabledCatch? : boolean;
    disabledWish? : boolean;

    constructor(id : number, name : string, weight :number, height : number, abilities : IAbility[], sprites : ISprites, base_experience : number,types : ITypes[]) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.abilities = abilities;
        this.sprites = sprites;
        this.base_experience = base_experience;
        this.types = types;
        this.disabledCatch = false;
        this.disabledWish = false;
    }
    
}
