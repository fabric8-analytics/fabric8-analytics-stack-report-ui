import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserIntentComponent } from './user-intent/user-intent.component';

const routes: Routes = [
  { path: 'analyze/:id', component: AppComponent },
  { path: '', component: AppComponent },
  { path: 'user-intent', component: UserIntentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
