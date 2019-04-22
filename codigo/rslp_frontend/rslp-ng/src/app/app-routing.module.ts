import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistroComponent } from './registro/registro.component';
import { UserconfigComponent } from './userconfig/userconfig.component';
import { AuthGuardService } from './auth-guard.service';
import { ListasPeliculasComponent } from './listas-peliculas/listas-peliculas.component';
import { ListasLibrosComponent } from './listas-libros/listas-libros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResenaComponent } from './resena/resena.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'home', component:MainComponent, canActivate:[AuthGuardService] },
  { path: 'registro', component:RegistroComponent },
  { path: 'config', component:UserconfigComponent, canActivate:[AuthGuardService] },
  { path: 'listapelis', component:ListasPeliculasComponent, canActivate:[AuthGuardService] },
  { path: 'listalibros', component:ListasLibrosComponent, canActivate:[AuthGuardService] },
  { path: 'perfil', component:PerfilComponent, canActivate:[AuthGuardService] },
  { path: 'resena/:idcontenido', component:ResenaComponent, canActivate:[AuthGuardService] },
  { path: '', component:MainComponent, canActivate:[AuthGuardService] }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}