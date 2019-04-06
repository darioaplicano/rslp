import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { UserconfigComponent } from './userconfig/userconfig.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'home', component:MainComponent, canActivate:[AuthGuardService] },
  { path: 'registro', component:RegistroComponent },
  { path: 'config', component:UserconfigComponent, canActivate:[AuthGuardService] },
  { path: '', component:MainComponent, canActivate:[AuthGuardService] }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}