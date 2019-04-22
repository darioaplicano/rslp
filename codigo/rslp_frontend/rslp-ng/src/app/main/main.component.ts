import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';
import { VistoLeido } from '../modelos/vistoLeido';
import { VerLeer } from '../modelos/verLeer';
import { Seguir } from '../modelos/seguir';
import { Activity } from '../modelos/activity';
import { Contenido } from '../modelos/contenido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dataService:DataService, public router: Router) { }
  user: Usuario;
  numFollowers = 0;

  activityLeidos:Array<VistoLeido> = [];
  activityLeer:Array<VerLeer> = [];
  activitySeguido:Array<Seguir> = [];

  activity:Array<Activity> = [];


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.dataService.getSeguidores(this.user).subscribe((data: []) => {
      this.numFollowers = data.length;
    })

    this.loadActivity()
  }

  loadActivity() {
    //obtenemos los usuarios que currentUser sigue
    //y por cada uno leemos sus listas de vistoLeido, verLeer y Seguidores
    this.dataService.getSeguidos(this.user).subscribe((data: []) => {
      data.forEach(d=>this.loadLists(d));
    })
  }

  loadLists(d:Seguir){
    this.dataService.getListaVerLeer(d.seguido).subscribe((l: []) => {
      this.activity = this.activity.concat(l.map((v:VerLeer)=>{
        var a = new Activity;
        a.contenido = v;
        a.tipo = "VerLeer";

        return a
      }));
      this.dataService.getListaVistosLeidos(d.seguido).subscribe((l2: []) => {
        this.activity = this.activity.concat(l2.map((v:VistoLeido)=>{
          var a = new Activity;
          a.contenido = v;
          a.tipo = "VistoLeido";
  
          return a
        }));
        this.dataService.getSeguidos(d.seguido).subscribe((l3: []) => {
          this.activity = this.activity.concat(l3.map((v:Seguir)=>{
            var a = new Activity;
            a.contenido = v;
            a.tipo = "Seguir";
    
            return a
          }));
        })
      })
    })
  }

  sortByDate(a:Array<Activity>): Array<Activity>{
    return a.sort((d:Activity, b:Activity)=>{
      
      var dtime = 0;
      var btime = 0;

      if(d.contenido.createdAt != null){
        dtime = new Date(d.contenido.createdAt).getTime();
      }
      if(b.contenido.createdAt != null){
        btime = new Date(b.contenido.createdAt).getTime();
      }

      return new Date(b.contenido.createdAt).getTime() - new Date(d.contenido.createdAt).getTime();
    })
  }

  verContenido(contenido:Contenido){
    localStorage.setItem("contenidoLS",JSON.stringify(contenido));
    localStorage.setItem('contenido._id', contenido._id);
    localStorage.setItem('contenido.titule', contenido.titule);
    localStorage.setItem('contenido.age', contenido.age);
    localStorage.setItem('contenido.gender', contenido.gender);
    localStorage.setItem('contenido.synopsis', contenido.synopsis);
    localStorage.setItem('contenido.authorDirector', contenido.authorDirector);
    localStorage.setItem('contenido.image', contenido.image);
    localStorage.setItem('contenido.type', contenido.type);
    this.router.navigate(['resena']);
  }

}
