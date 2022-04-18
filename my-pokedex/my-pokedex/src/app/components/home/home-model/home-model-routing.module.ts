import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPokemonComponent } from '../../list-pokemon/list-pokemon.component';
import { PersonalComponent } from '../../personal/personal.component';
import { WishlistComponent } from '../../wishlist/wishlist.component';

const routes: Routes = [
  {path: "list" , component : ListPokemonComponent},
  {path: "personal" , component : PersonalComponent},
  {path: "wishlist" , component : WishlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeModelRoutingModule { }
