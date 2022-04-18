import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Confirmation, ConfirmationService, Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog, DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';
import { IPokemonDetail } from 'src/app/models/pokemon-detail/pokemon-detail';
import { IPokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageService } from 'src/app/services/storage.service';

import { ListPokemonComponent } from './list-pokemon.component';

describe('ListPokemonComponent', () => {
  let component: ListPokemonComponent;
  let fixture: ComponentFixture<ListPokemonComponent>;
  let service1: ConfirmationService;
  let service2: MessageService;
  let servicePokemon: PokemonService;
  let pokemon: IPokemon;
  let pokemonDetail: IPokemonDetail;
  let storage: StorageService;

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPokemonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, TableModule, ConfirmDialogModule, ToastModule, DialogModule, ButtonModule],
      providers: [ConfirmationService, MessageService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPokemonComponent);
    component = fixture.componentInstance;
    service1 = TestBed.inject(ConfirmationService);
    service2 = TestBed.inject(MessageService);
    servicePokemon = TestBed.inject(PokemonService);
    storage = TestBed.inject(StorageService);
    pokemon = {
      count: 10,
      next: '2',
      previous: '1',
      results: []
    };
    pokemonDetail = {
      id: 1,
      name: 'charmander',
      weight: 133,
      height: 10,
      abilities: [],
      sprites: { front_default: '', front_shiny: '' },
      base_experience: 2,
      types: [],
      disabledCatch : true,
      disabledWish : true
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service1).toBeTruthy();
    expect(service2).toBeTruthy();
    expect(servicePokemon).toBeTruthy();
  });

  it('should get all pokemons', () => {
    component.rows = 4;
    component.first = 0;
    spyOn(servicePokemon, 'getAllPokemon').and.callFake(() => {
      return of(pokemon);
    });
    component.getPokemon(component.rows, component.first);
    expect(servicePokemon.getAllPokemon).toHaveBeenCalledWith(component.rows, component.first);
  });

  it('should get detail pokemon', () => {
    let url = 'pokemon/1'
    spyOn(servicePokemon, 'getPokemonDetail').and.callFake(() => {
      return of(pokemonDetail);
    });
    component.getDetailPokemon(url);
    expect(servicePokemon.getPokemonDetail).toHaveBeenCalledWith(url);
  });

  it('should get catchPokemon', () => {
    // @ts-ignore
    let accept = spyOn(service1, "confirm").and.callFake((confirmation: Confirmation) => confirmation.accept(pokemonDetail.disabledCatch = true,
      pokemonDetail.disabledWish = true));
    component.catchPokemon(pokemonDetail);
    expect(accept).toHaveBeenCalled();
    expect(pokemonDetail.disabledCatch).toBe(true);
    storage.catchPokemon('sometoken', 'pokemon'),
    expect(localStorage.getItem('sometoken')).toEqual('pokemon')
  });

  it('should add to wishlist', () => {
    // @ts-ignore
    let accept = spyOn(service1, "confirm").and.callFake((confirmation: Confirmation) => confirmation.accept(
      pokemonDetail.disabledWish = true));
    component.addToWishlist(pokemonDetail);
    expect(accept).toHaveBeenCalled();
    expect(pokemonDetail.disabledWish).toBe(true);
    storage.catchPokemon('sometoken', 'pokemon'),
    expect(localStorage.getItem('sometoken')).toEqual('pokemon')
  });

  it('should show detail pokemon', () => {
    component.showDetailPokemon(pokemonDetail);
    expect(component.pokemonDialog).toBe(true);
  });

  it('should apply filter', () => {
    const event = { target: { value: 'charmender' } };
    component.applyFilterGlobal(event, 'contains');
    expect(component.isLazy).toBe(false);
    expect(component.dt?.filterGlobal(event.target.value, 'contains'));
  });
 
/* 
  it('if apply filter value is empty', () => {
    const event = { target: { value: '' } };
    component.applyFilterGlobal(event, 'contains');
    expect(component.isLazy).toBe(true);
  }); */

  it('if should load pokemons', () => {
    const event = { first : 0, rows : 4 };
    component.loadPokemons(event);
    expect(component.loading).toBe(true);
  });

});
