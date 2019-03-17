import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: any = [];
  constructor( private usuarioService: DataService) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.usuarioService.getUsuarios().subscribe((data: {}) => {
      this.usuarios = data;
    })
  }

}
