import { Pokemon } from './pokemon';

describe('Pokemon', () => {
  let pokemonObj = {count : 1, next : '2', previous : '1', results : []}
  it('should create an instance', () => {
    expect(new Pokemon(pokemonObj)).toBeTruthy();
  });
});
