import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import { DropdownModule } from "ngx-dropdown";
import { BsDropdownModule } from 'ngx-bootstrap';


import { UserIntentComponent } from './user-intent.component';
import { UserIntentViewComponent } from './user-intent-view/user-intent-view.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    UserIntentComponent,
    UserIntentViewComponent
  ],
  exports: [
    UserIntentComponent
  ],
  providers: [ ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserIntentModule {
  constructor() {}
}
