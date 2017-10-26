import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-modal';
import { TabsModule, AccordionModule } from 'ngx-bootstrap';

import { UserIntentComponent } from './user-intent.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ModalModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    UserIntentComponent
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
