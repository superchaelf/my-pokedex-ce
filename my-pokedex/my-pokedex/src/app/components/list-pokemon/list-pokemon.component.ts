import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IPokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { IPokemon, Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit, AfterContentChecked {
  @ViewChild('dt') dt: Table | undefined;
  listPokemons: IPokemonDetail[] = [];
  first: number = 0;
  rows: number = 4;
  count: number = 0;
  pokemonDialog: boolean;
  pokemon!: IPokemonDetail;
  disabledCatch: boolean;
  loading: boolean;
  isLazy: boolean;

  constructor(private pokemonService: PokemonService, private confirmationService: ConfirmationService, private messageService: MessageService,
    private storage: StorageService, private router : Router, private cdref: ChangeDetectorRef) {
      this.pokemonDialog = false;
      this.disabledCatch = false;
      this.loading = false;
      this.isLazy = true;
     }


  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
  }

  getPokemon(rows: number, first: number) {
    this.pokemonService.getAllPokemon(rows, first).subscribe((res: IPokemon) => {
      this.count = res.count;
      this.first = first;
      this.rows = rows;
      res.results.forEach(element => {
        this.getDetailPokemon(element.url)
      });
    })
  }

  getDetailPokemon(url: string) {
    this.listPokemons = [];
    this.pokemonService.getPokemonDetail(url).subscribe(results => {
      this.listPokemons.push(results);
      try {
        let pokemonCatched = this.storage.getPokemon("pokemon-catch") ? JSON.parse(this.storage.getPokemon('pokemon-catch') || '{}') : [];
        let pokemonWishlist = this.storage.getPokemon("pokemon-wishlist") ? JSON.parse(this.storage.getPokemon('pokemon-wishlist') || '{}') : [];
        if (pokemonCatched) {
          for (let i = 0; i < pokemonCatched.length; i++) {
            let filtered = this.listPokemons.findIndex(element => element.id === pokemonCatched[i].id);
            if (filtered >= 0 && pokemonCatched[i].disabledCatch === true) {
              this.listPokemons[filtered].disabledCatch = true;
              this.listPokemons[filtered].disabledWish = true;
            }
          }
        }
        if (pokemonWishlist) {
          for (let i = 0; i < pokemonWishlist.length; i++) {
            let filtered = this.listPokemons.findIndex(element => element.id === pokemonWishlist[i].id);
            if (filtered >= 0 && pokemonWishlist[i].disabledWish === true) {
              this.listPokemons[filtered].disabledWish = true;
            }
          }
        }
      } catch (error) {
        console.log(error)
      }

      return this.listPokemons;
    });

  }

  loadPokemons(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.listPokemons) {
        let first = event?.first ? event?.first : 0;
        let rows = event?.rows ? event?.rows : 0;
        this.getPokemon(rows, first);
        this.loading = false;
      }
    }, 1000);
  }


  applyFilterGlobal($event: any, stringVal: string) {
    this.isLazy = false;
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    if ($event.target.value === '') {
      this.isLazy = true;
      window.location.reload();
    }
  }

  showDetailPokemon(pokemon: IPokemonDetail) {
    this.pokemon = { ...pokemon };
    this.pokemonDialog = true;
  }

  catchPokemon(pokemon: IPokemonDetail) {
    const pokemonList = this.storage.getPokemon("pokemon-catch") ? JSON.parse(this.storage.getPokemon("pokemon-catch") || "[]") : [];
    this.confirmationService.confirm({
      message: 'Do you want to catch this pokemon?',
      header: 'Confirm',
      accept: () => {
        pokemon.disabledCatch = true;
        pokemon.disabledWish = true;
        pokemonList.push(pokemon);
        this.storage.catchPokemon('pokemon-catch', JSON.stringify(pokemonList));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pokemon catched ;) ', life: 3000 });
      }
    });


  }

  addToWishlist(pokemon: IPokemonDetail) {
    const pokemonList = this.storage.getPokemon("pokemon-wishlist") ? JSON.parse(this.storage.getPokemon("pokemon-wishlist") || "[]") : [];
    this.confirmationService.confirm({
      message: 'Do you want to add this pokemon to your wishlist?',
      header: 'Confirm',
      accept: () => {
        pokemon.disabledWish = true;
        pokemonList.push(pokemon);
        this.storage.catchPokemon('pokemon-wishlist', JSON.stringify(pokemonList));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pokemon added to wishlist ;) ', life: 3000 });
      }
    });

  }


}
