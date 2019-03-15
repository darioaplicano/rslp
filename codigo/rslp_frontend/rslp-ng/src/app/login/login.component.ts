import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Usuario } from '../modelos/usuario';
import { FormGroup } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: any = [];
  model = new Usuario();
  constructor( private usuarioService: DataService) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.usuarioService.getUsuarios().subscribe((data: {}) => {
      this.usuarios = data;
    })
  }

  onSubmit() {
    console.log("submitted: "+this.model.nickname+" "+this.model.contrasena);
  }

}
