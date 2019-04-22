import { Component, OnInit } from '@angular/core';
import { VistoLeido } from '../modelos/vistoLeido';
import { DataService } from '../data.service';
import { VerLeer } from '../modelos/verLeer';
import { Router } from '@angular/router';
import { Contenido } from '../modelos/contenido';

@Component({
  selector: 'app-listas-peliculas',
  templateUrl: './listas-peliculas.component.html',
  styleUrls: ['./listas-peliculas.component.css']
})
export class ListasPeliculasComponent implements OnInit {

  genreList = [];


  title:string = "";
  genre:Array<string> = [];
  director:string = "";
  recomended:boolean = false;

  orSeenList:Array<VistoLeido> = []
  orToseeList:Array<VerLeer> = []

  seenList:Array<VistoLeido> = [];
  toseeList:Array<VerLeer> = [];

  constructor(private dataservice:DataService, public router: Router){}

  ngOnInit() {
    this.getLists();
  }

  getLists(){
    this.dataservice.getListaVistosLeidos(JSON.parse(localStorage.getItem("currentUser"))).subscribe(
      (d:Array<VistoLeido>)=>{
        this.orSeenList=d.filter(e=>e.contenido.type=="movie")
        this.dataservice.getListaVerLeer(JSON.parse(localStorage.getItem("currentUser"))).subscribe(
          (d2:Array<VerLeer>)=>{
            this.orToseeList=d2.filter(e=>e.contenido.type=="movie")
            this.refresh();
          })
      })
  }

  refresh(){
    this.seenList = this.orSeenList;
    this.toseeList = this.orToseeList;    
    this.genreList = this.seenList.map(el=>el.contenido.gender.split(",")).concat(this.toseeList.map(el=>el.contenido.gender.split(","))).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; })
  }

  hasSubArray(master, sub) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
  }

  filter(){
    this.refresh();

    this.seenList = this.seenList.filter(m=>
      m.contenido.titule.toLowerCase().includes(this.title.toLowerCase()) &&
      m.contenido.authorDirector.toLowerCase().includes(this.director.toLowerCase()) &&
      (this.genre.length==0 || this.hasSubArray(m.contenido.gender.split(","),this.genre)) &&
      (!this.recomended || m.recomienda)
    )

    this.toseeList = this.toseeList.filter(m=>
      m.contenido.titule.toLowerCase().includes(this.title.toLowerCase()) &&
      m.contenido.authorDirector.toLowerCase().includes(this.director.toLowerCase()) &&
      (this.genre.length==0 || this.hasSubArray(m.contenido.gender.split(","),this.genre)) &&
      !this.recomended
    )

    this.genreList = this.seenList.map(el=>el.contenido.gender.split(",")).concat(this.toseeList.map(el=>el.contenido.gender.split(","))).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }
}
