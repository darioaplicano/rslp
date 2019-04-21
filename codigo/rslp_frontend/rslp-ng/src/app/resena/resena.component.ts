import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Resena } from '../modelos/resena'
import { Contenido } from '../modelos/contenido';
import { Router } from '@angular/router';
import { VistoLeido } from '../modelos/vistoLeido'

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
  recomienda = (localStorage.getItem('recomienda') == "true");

  ListResena:Array<Resena> = [];
  newResena =  new Resena();
  newVistoLeido = new VistoLeido();


  constructor(private dataservice:DataService, public router: Router) {}

  ngOnInit() {
    this.getResena();
  }

  getResena(){
    this.dataservice.getResena(this._id).subscribe((d:Array<Resena>)=>{this.ListResena = d});
  }

  saveResena(){
    this.newResena.contenido = JSON.parse(localStorage.getItem("contenidoLS"));
    this.newResena.usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.dataservice.createResena(this.newResena).subscribe((data:{})=> {
      this.getResena();
    });
    this.newResena.comentario = "";
    this.newResena.valoracion = "";
  }

  recomendar(){
    this.newVistoLeido.contenido = JSON.parse(localStorage.getItem("contenidoLS"));
    this.newVistoLeido.usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.newVistoLeido.recomienda = !this.recomienda;
    this.dataservice.updateRecomendacion(this.newVistoLeido).subscribe((data:{})=>{
      this.getResena();
    });
    this.newResena.comentario = "";
    this.newResena.valoracion = "";
    this.recomienda = !this.recomienda;
  }

}
