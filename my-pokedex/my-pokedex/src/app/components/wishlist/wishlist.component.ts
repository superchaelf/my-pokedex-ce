import { Component, OnInit } from '@angular/core';
import { IPokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  pokemons: IPokemonDetail[] = [];

  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.pokemons = this.storage.getPokemon("pokemon-wishlist") ? JSON.parse(this.storage.getPokemon('pokemon-wishlist') || '{}') : [];
  }

  removeWishListPokemon(pokemon : IPokemonDetail) {
    const index = this.pokemons.findIndex(pok => pok.id == pokemon.id);
    this.pokemons.splice(index,1);
    this.storage.catchPokemon('pokemon-wishlist', JSON.stringify(this.pokemons));
  }

}
