import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.css']
})
export class UserconfigComponent implements OnInit {

  model = new Usuario();
  constructor( private usuarioService:DataService) { }

  ngOnInit() {
    this.model = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.model);
  }

  onSubmit() {
    //TODO: ask for password
    console.log(this.model)
    this.usuarioService.updateUsuario(this.model).subscribe((data:{}) => {
      console.log(data)
      localStorage.setItem('currentUser', JSON.stringify(data))
    });
  }

  delete() {
    //TODO: ask for confirmation
    this.usuarioService.deleteUsuario(this.model).subscribe(() => {
      console.log("deleted")
      localStorage.removeItem('currentUser')
    });
  }
}
