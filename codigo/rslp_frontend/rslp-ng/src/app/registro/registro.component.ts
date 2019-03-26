import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  model = new Usuario();

  constructor(private usuarioService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.usuarioService.createUsuario(this.model).subscribe((data:{}) => {
      localStorage.setItem('currentUser', JSON.stringify(data[0]))
    });
  }

}
