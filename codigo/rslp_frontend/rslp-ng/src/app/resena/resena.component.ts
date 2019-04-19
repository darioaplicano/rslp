import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Contenido } from '../modelos/contenido';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent implements OnInit {

  _id = localStorage.getItem('contenido._id');
  titule = localStorage.getItem('contenido.titule');
  age = localStorage.getItem('contenido.age');
  gender = localStorage.getItem('contenido.gender');
  synopsis = localStorage.getItem('contenido.synopsis');
  authorDirector = localStorage.getItem('contenido.authorDirector');
  image = localStorage.getItem('contenido.image');
  type = localStorage.getItem('contenido.type');

  genreList = [];


  title:string = "";
  genre:Array<string> = [];
  director:string = "";
  recomended:boolean = false;
  Content: Contenido;

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.getContent();
  }

  getContent(){
    
  }

}
