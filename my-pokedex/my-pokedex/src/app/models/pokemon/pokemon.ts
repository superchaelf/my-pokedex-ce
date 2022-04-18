export interface IResultsPokemon {
    name: string;
    url: string;
}

export interface IPokemon {
    count : number;
    next : string;
    previous : string;
    results : IResultsPokemon[];
}

export class Pokemon implements IPokemon{
    count : number;
    next : string;
    previous : string;
    results : IResultsPokemon[];

    constructor(obj : Pokemon) {
        this.count = obj.count;
        this.next = obj.next;
        this.previous = obj.previous;
        this.results = obj.results;
    }

}
