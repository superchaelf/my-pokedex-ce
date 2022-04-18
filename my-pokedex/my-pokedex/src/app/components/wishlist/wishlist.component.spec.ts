import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { IPokemonDetail, PokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { StorageService } from 'src/app/services/storage.service';

import { WishlistComponent } from './wishlist.component';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let service: StorageService;
  let pokemon: IPokemonDetail;
  let pokemonDetail : PokemonDetail[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistComponent ],
      imports : [ DataViewModule, ButtonModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StorageService);
    pokemon = {
      id: 1,
      name: 'charmander',
      weight: 133,
      height: 10,
      abilities: [],
      sprites: { front_default: '', front_shiny: '' },
      base_experience: 2,
      types: [],
    },
    pokemonDetail = [{
      id: 1,
      name: 'charmander',
      weight: 133,
      height: 10,
      abilities: [],
      sprites: { front_default: '', front_shiny: '' },
      base_experience: 2,
      types: [],
    }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should remove catched pokemon', () => {
    component.pokemons = pokemonDetail;
    component.removeWishListPokemon(pokemon);
    expect(component.pokemons.findIndex(pok => pok.id === pokemon.id)).toBe(-1);
    service.catchPokemon('sometoken', 'pokemon');
    expect(localStorage.getItem('sometoken')).toEqual('pokemon');
  });

});
