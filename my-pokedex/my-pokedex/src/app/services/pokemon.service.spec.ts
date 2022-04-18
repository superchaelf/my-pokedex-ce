import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { IPokemon, Pokemon } from '../models/pokemon/pokemon';
import { HttpResponse } from '@angular/common/http';
import { IPokemonDetail } from '../models/pokemon-detail/pokemon-detail';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  let pokemon : IPokemon;
  let pokemonDetail : IPokemonDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    pokemon = {
      count : 10,
      next : '2',
      previous : '1',
      results : []
    };
    pokemonDetail = {
      id : 1,
      name : 'charmander',
      weight : 133,
      height : 10,
      abilities : [],
      sprites : {front_default : '', front_shiny : ''},
      base_experience : 2,
      types : [],
    } 
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all pokemons', (done) => {
    service.getAllPokemon(4,0).subscribe(
      (data) => {
        data = {
          count : 10,
          next : '2',
          previous : '1',
          results : []
        } as IPokemon;
        expect(data).toEqual(pokemon);
        done();
      }
    )
    const request = httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=4');
    request.event(new HttpResponse<boolean>({body: true}));
  });

  it('should return pokemon detail', (done) => {
    service.getPokemonDetail('pokemon/1').subscribe(
      (data) => {
        data = {
          id : 1,
          name : 'charmander',
          weight : 133,
          height : 10,
          abilities : [],
          sprites : {front_default : '', front_shiny : ''},
          base_experience : 2,
          types : [],
        } as IPokemonDetail;
        expect(data).toEqual(pokemonDetail);
        done();
      }
    )
    const request = httpTestingController.expectOne('pokemon/1');
    request.event(new HttpResponse<boolean>({body: true}));
  });
 
});
