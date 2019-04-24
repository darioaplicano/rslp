import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from '../modelos/contenido';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  contentList = [];
  userList = [];

  contentListFull = [];
  genreList = [];

  title:string = "";
  genre:Array<string> = [];
  director:string = "";
  movie:boolean = true;
  book:boolean = true;

  queryString = "";

  constructor(public dataservice:DataService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{  
      this.queryString = params.query;
      this.filterByQuery(this.queryString);      
    })
  }

  filterByQuery(query:string){
    this.dataservice.getContenido().subscribe((data:[])=>
      {
        this.contentListFull = data.filter((d:Contenido)=> 
          d.titule.toLowerCase().includes(query.toLowerCase())
        )
        this.contentList = this.contentListFull;
        this.genreList = this.contentList.map(el=>el.gender.split(",").map(x=>x.trim())).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
      }
    )
    this.dataservice.getUsuarios().subscribe((data:[])=>
    {
      this.userList = data.filter((d:Usuario)=> 
      d.nickname.toLowerCase().includes(query.toLowerCase())
      )
    })
  }

  refresh(){
    this.contentList = this.contentListFull;

    this.genreList = this.contentList.map(el=>el.gender.split(",").map(x=>x.trim())).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }

  hasSubArray(master, sub) {
    return sub.every((v)=>master.includes(v));
  } 

  filter(){
    this.refresh();

    this.contentList = this.contentList.filter(m=>
      m.titule.toLowerCase().includes(this.title.toLowerCase()) &&
      m.authorDirector.toLowerCase().includes(this.director.toLowerCase()) &&
      (this.genre.length==0 || this.hasSubArray(m.gender.split(",").map(x=>x.trim()),this.genre)) &&
      ((this.movie && m.type=="movie") ||
      (this.book && m.type=="book"))
    )

    this.genreList = this.contentList.map(el=>el.gender.split(",").map(x=>x.trim())).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }

}
