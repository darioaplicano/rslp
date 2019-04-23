import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { RegistroComponent } from './registro/registro.component';
import { UserconfigComponent, DialogoPasswd, DialogoDelete } from './userconfig/userconfig.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListasPeliculasComponent } from './listas-peliculas/listas-peliculas.component';
import { ListasLibrosComponent } from './listas-libros/listas-libros.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PerfilComponent } from './perfil/perfil.component';
import { ResenaComponent } from './resena/resena.component';
import { MatSnackBarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MatDialogModule} from '@angular/material/dialog';
import { ContentConfigComponent, DialogoConfirmate, DialogoContentDelete } from './content-config/content-config.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AgregarContenidoComponent } from './agregar-contenido/agregar-contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegistroComponent,
    UserconfigComponent,
    NavBarComponent,
    ListasPeliculasComponent,
    ListasLibrosComponent,
    PerfilComponent,
    DialogoPasswd,
    DialogoDelete,
    DialogoConfirmate,
    DialogoContentDelete,
    ResenaComponent,
    ContentConfigComponent,
    BusquedaComponent,
    AgregarContenidoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    NgbModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent,DialogoPasswd,DialogoDelete, DialogoConfirmate, DialogoContentDelete]
})
export class AppModule { }
