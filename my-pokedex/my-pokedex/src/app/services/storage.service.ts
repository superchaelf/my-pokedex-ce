import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getPokemon(pokemon : string) {
    return localStorage.getItem(pokemon);
  }

  catchPokemon(key: string, pokemon : any) {
    return localStorage.setItem(key,pokemon);
  }
}
