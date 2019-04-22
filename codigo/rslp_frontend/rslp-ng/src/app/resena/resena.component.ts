import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Resena } from '../modelos/resena'
import { Contenido } from '../modelos/contenido';
import { Router } from '@angular/router';
import { VistoLeido } from '../modelos/vistoLeido'
import { VerLeer } from '../modelos/verLeer';

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
  verLeer = (localStorage.getItem('ver') == "true");
  lista = localStorage.getItem('listado');

  ListResena:Array<Resena> = [];
  newResena =  new Resena();
  newVistoLeido = new VistoLeido();
  newVerLeer = new VerLeer();


  constructor(private dataservice:DataService, public router: Router) {}

  ngOnInit() {
    this.getResena();
    this.newResena.contenido = JSON.parse(localStorage.getItem("contenidoLS"));
    this.newResena.usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.newVistoLeido.contenido = JSON.parse(localStorage.getItem("contenidoLS"));
    this.newVistoLeido.usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.newVistoLeido.recomienda = false;
    this.newVerLeer.contenido = JSON.parse(localStorage.getItem("contenidoLS"));
    this.newVerLeer.usuario = JSON.parse(localStorage.getItem("currentUser"));
  }

  getResena(){
    this.dataservice.getResena(this._id).subscribe((d:Array<Resena>)=>{this.ListResena = d});
  }

  saveResena(){
    this.dataservice.createResena(this.newResena).subscribe((data:{})=> {
      this.getResena();
    });
    this.newResena.comentario = "";
    this.newResena.valoracion = "";
  }

  recomendar(){
    this.newVistoLeido.recomienda = !this.recomienda;
    this.dataservice.updateRecomendacion(this.newVistoLeido).subscribe((data:{})=>{
      this.getResena();
    });
    this.newResena.comentario = "";
    this.newResena.valoracion = "";
    this.recomienda = !this.recomienda;
  }

  listado(listado: string){
    alert("Entró aquí "+listado);
    if(listado == 'porver'){
      if(this.lista == 'visto'){
        this.dataservice.deletevistoLeido(this.newVistoLeido).subscribe((data:{})=>{
          this.dataservice.createverLeer(this.newVerLeer).subscribe((data:{})=>{
            
          });
        });
      }else if(this.lista == 'ninguno'){
        this.dataservice.createverLeer(this.newVerLeer).subscribe((data:{})=>{

        });
      }
      this.lista = 'porver';
      this.verLeer = false;
    }else if(listado == 'visto'){
      if(this.lista == 'porver'){
        this.dataservice.deleteverLeer(this.newVerLeer).subscribe((data:{})=>{
          this.dataservice.createvistoLeido(this.newVistoLeido).subscribe((data:{})=>{

          });
        });
      }else if(this.lista == 'ninguno'){
        this.dataservice.createvistoLeido(this.newVistoLeido).subscribe((data:{})=>{

        });
      }
      this.lista = 'visto';
      this.verLeer = true;
    }else if(listado == 'ninguno'){
      if(this.lista == 'porver'){
        this.dataservice.deleteverLeer(this.newVerLeer).subscribe((data:{})=>{

        });
      }else if(this.lista == 'visto'){
        this.dataservice.deletevistoLeido(this.newVistoLeido).subscribe((data:{})=>{

        });
      }
      this.lista = 'ninguno';
      this.verLeer = false;
    }
  }

}
