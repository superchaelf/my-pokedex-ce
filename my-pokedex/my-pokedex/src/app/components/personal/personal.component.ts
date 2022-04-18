import { Component, OnInit } from '@angular/core';
import { IPokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  pokemons: IPokemonDetail[] = [];
  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.pokemons = this.storage.getPokemon("pokemon-catch") ? JSON.parse(this.storage.getPokemon('pokemon-catch') || '{}') : [];
  }

  removeCatchPokemon(pokemon : IPokemonDetail) {
    const index = this.pokemons.findIndex(pok => pok.id == pokemon.id);
    this.pokemons.splice(index,1);
    this.storage.catchPokemon('pokemon-catch', JSON.stringify(this.pokemons));
  }

}
