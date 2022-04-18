import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    let store = {} as any;
    const mockLocalStorage = {
      getPokemon: (key: string): string => {
        return key in store ? store[key] : null;
      },
      catchPokemon: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removePokemon: (key: string) => {
        delete store[key];
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getPokemon);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.catchPokemon);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removePokemon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the pokemon in localStorage',
    () => {
      service.catchPokemon('sometoken', 'pokemon');
      expect(localStorage.getItem('sometoken')).toEqual('pokemon');
    });

  it('should return stored pokemon from localStorage',
    () => {
      localStorage.setItem('id_token', 'anothertoken');
      expect(service.getPokemon('id_token')).toEqual('anothertoken');
    });


});
