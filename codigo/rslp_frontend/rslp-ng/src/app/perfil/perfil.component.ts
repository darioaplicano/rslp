import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';
import { VistoLeido } from '../modelos/vistoLeido';
import { VerLeer } from '../modelos/verLeer';
import { Router, ActivatedRoute } from '@angular/router';
import { Contenido } from '../modelos/contenido';

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

  constructor(private dataService:DataService, public router: Router, public route: ActivatedRoute) { }
  user: Usuario;
  userPerfil: Usuario;
  seguidores: Array<Usuario>;
  validator: boolean;
  numFollowers = 0;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    var userPerfil = this.route.snapshot.paramMap.get("nickname");
    this.dataService.getUsuario(userPerfil).subscribe((data:{}) => {
      this.userPerfil = data[0];

      /* Verificar si el usuario del perfil es el mismo que ha iniciado sesión */
      /* Para mostrar o no la lista de películas y libros */
      this.validator = this.user._id == this.userPerfil._id;
      this.getLists()

      this.dataService.getSeguidores(this.userPerfil).subscribe((data: []) => {
        this.seguidores = data;
        console.log(this.seguidores)
      });
    });
  }

  getLists(){
    this.dataService.getListaVistosLeidos(this.userPerfil).subscribe(
      (d:Array<VistoLeido>)=>{
        this.orSeenList=d
        this.dataService.getListaVerLeer(this.userPerfil).subscribe(
          (d2:Array<VerLeer>)=>{
            this.orToseeList=d2
            this.refresh();
          })
      })
  }

  refresh(){
    this.seenList = this.orSeenList;
    this.toseeList = this.orToseeList;    
    this.genreList = this.seenList.map(el=>el.contenido.gender.split(",")).concat(this.toseeList.map(el=>el.contenido.gender.split(","))).reduce((acc, val) => acc.concat(val), []).filter(function(item, i, ar){ return ar.indexOf(item) === i; })
  }

  verContenido(contenido:Contenido, recomienda: string, vistoLeer: string, listado: string){
    localStorage.setItem("contenidoLS",JSON.stringify(contenido));
    localStorage.setItem('recomienda', recomienda);
    localStorage.setItem('ver', vistoLeer);
    localStorage.setItem('listado', listado);

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

