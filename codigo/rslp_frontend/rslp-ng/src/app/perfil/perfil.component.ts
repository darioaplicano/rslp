import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';
import { VistoLeido } from '../modelos/vistoLeido';
import { VerLeer } from '../modelos/verLeer';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  genreList = [];


  title:string = "";
  genre:Array<string> = [];
  director:string = "";
  recomended:boolean = false;

  orSeenList:Array<VistoLeido> = []
  orToseeList:Array<VerLeer> = []

  seenList:Array<VistoLeido> = [];
  toseeList:Array<VerLeer> = [];

  constructor(private dataService:DataService) { }
  user: Usuario;
  seguidores: Array<Usuario>;
  numFollowers = 0;
  ngOnInit() {
    this.getLists();
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.dataService.getSeguidores(this.user).subscribe((data: []) => {
      this.seguidores = data;
      console.log(this.seguidores)
    })
  }

  getLists(){
    this.dataService.getListaVistosLeidos(JSON.parse(localStorage.getItem("currentUser"))).subscribe(
      (d:Array<VistoLeido>)=>{
        this.orSeenList=d.filter(e=>e.contenido.type=="movie")
        this.dataService.getListaVerLeer(JSON.parse(localStorage.getItem("currentUser"))).subscribe(
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


}

