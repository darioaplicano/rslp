import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Resena } from '../modelos/resena'

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

  ListResena:Array<Resena> = [];

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.getResena();
  }

  getResena(){
    this.dataservice.getResena(this._id).subscribe((d:Array<Resena>)=>{this.ListResena = d});
  }

}
