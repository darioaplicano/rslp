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
    this.usuarioService.getUsuario(this.model.nickname).subscribe((data:{}) => {
      let datalength = Object.keys(data).length;
      if(datalength > 0){
        console.log(data[0].contrasena);
        if(this.model.contrasena == data[0].contrasena){
          console.log("LOGIN");
        }
        else {
          console.log("PASSWORD ERR");
        }
      }
      else{
        console.log(this.model.nickname +" no encontrado.")
      }
    })
    console.log("submitted: "+this.model.nickname+" "+this.model.contrasena);
  }

}
