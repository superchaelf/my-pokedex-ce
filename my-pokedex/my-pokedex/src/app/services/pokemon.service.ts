import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon, Pokemon } from '../models/pokemon/pokemon';
import { Observable } from 'rxjs/internal/Observable';
import { IPokemonDetail } from '../models/pokemon-detail/pokemon-detail';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = '';

  constructor(private http : HttpClient) {
    this.url = 'https://pokeapi.co/api/v2/pokemon';
  }

  // Get list of Pokemons
  getAllPokemon(limit: number, offset: number) : Observable<IPokemon>{
    return this.http.get<IPokemon>(`${this.url}?offset=${offset}&limit=${limit}`);
  }

  // Get list of pokemons with details
  getPokemonDetail(url :string) : Observable<IPokemonDetail>{
    return this.http.get<IPokemonDetail>(`${url}`);
  }


}
