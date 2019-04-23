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
import { AnadirPeliculasComponent} from './anadir-peliculas/anadir-peliculas.component';
import { AnadirLibrosComponent} from './anadir-libros/anadir-libros.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ContentConfigComponent } from './content-config/content-config.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'home', component:MainComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always' },
  { path: 'registro', component:RegistroComponent },
  { path: 'config', component:UserconfigComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always' },
  { path: 'listapelis', component:ListasPeliculasComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always' },
  { path: 'listalibros', component:ListasLibrosComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'perfil/:nickname', component:PerfilComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'resena/:idcontenido', component:ResenaComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always' },

  { path: '', component:MainComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'anadir-libros', component:AnadirLibrosComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'anadir-peliculas', component:AnadirPeliculasComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'busqueda/:query', component:BusquedaComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always'  },
  { path: 'contentConfig/:idcontenido', component:ContentConfigComponent, canActivate:[AuthGuardService], runGuardsAndResolvers:'always' },
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ]
})
export class AppRoutingModule {}