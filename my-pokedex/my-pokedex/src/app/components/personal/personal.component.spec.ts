import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { IPokemonDetail, PokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { StorageService } from 'src/app/services/storage.service';

import { PersonalComponent } from './personal.component';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;
  let service: StorageService;
  let pokemon: IPokemonDetail;
  let pokemonDetail : PokemonDetail[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalComponent],
      imports: [DataViewModule, ButtonModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
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
    component.removeCatchPokemon(pokemon);
    expect(component.pokemons.findIndex(pok => pok.id === pokemon.id)).toBe(-1);
    service.catchPokemon('sometoken', 'pokemon');
    expect(localStorage.getItem('sometoken')).toEqual('pokemon');
  });
});
