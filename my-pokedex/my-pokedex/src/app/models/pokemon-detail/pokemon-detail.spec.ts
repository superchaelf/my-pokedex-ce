import { PokemonDetail } from './pokemon-detail';

describe('PokemonDetail', () => {
  it('should create an instance', () => {
    let sprites = 
    expect(new PokemonDetail(1,'test',1,1,[],{front_default : '',front_shiny : ''},1,[])).toBeTruthy();
  });
});
