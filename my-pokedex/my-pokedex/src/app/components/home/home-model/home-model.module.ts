import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';


import { HomeModelRoutingModule } from './home-model-routing.module';
import { ListPokemonComponent } from '../../list-pokemon/list-pokemon.component';
import { PersonalComponent } from '../../personal/personal.component';
import { WishlistComponent } from '../../wishlist/wishlist.component';

@NgModule({
  declarations: [
    ListPokemonComponent,
    PersonalComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    HomeModelRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    DataViewModule
  ],
  exports: [
    ListPokemonComponent,
    PersonalComponent,
    WishlistComponent
  ],
  providers: [MessageService, ConfirmationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class HomeModelModule { }
