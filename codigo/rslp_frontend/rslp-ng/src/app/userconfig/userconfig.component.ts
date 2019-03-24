import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.css']
})
export class UserconfigComponent implements OnInit {

  model: Usuario;
  constructor() { }

  ngOnInit() {
    this.model = new Usuario;
  }

  onSubmit() {
    console.log("submitted");
  }
}
