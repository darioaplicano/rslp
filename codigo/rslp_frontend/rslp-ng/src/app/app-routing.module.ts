import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'main', component:MainComponent },
  { path: 'registro', component:RegistroComponent },
  { path: '', component:MainComponent }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}