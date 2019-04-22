import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Resena } from '../modelos/resena'
import { Contenido } from '../modelos/contenido';
import { Router, ActivatedRoute } from '@angular/router';
import { VistoLeido } from '../modelos/vistoLeido'
import { VerLeer } from '../modelos/verLeer';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent implements OnInit {

  contenido:Contenido;

  _id:string;
  titule:string;
  age:string;
  gender:string;
  synopsis:string;
  authorDirector:string;
  image:string;
  type:string;
  recomienda:boolean = false;
  verLeer:boolean = false;  
  vistoLeido:boolean = false;
  lista = localStorage.getItem('listado');

  ListResena:Array<Resena> = [];
  newResena =  new Resena();
  newVistoLeido = new VistoLeido();
  newVerLeer = new VerLeer();


  constructor(private dataservice:DataService, public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    //leemos el id del contenido de la url, y la buscamos en la base de datos
    var id = this.route.snapshot.paramMap.get("idcontenido");
    this.dataservice.getContenidoPorId(id).subscribe((data:Contenido)=>{
      this.contenido = data;
      this._id = this.contenido._id;
      this.titule = this.contenido.titule;
      this.age = this.contenido.age;
      this.authorDirector = this.contenido.authorDirector;
      this.gender = this.contenido.gender;
      this.image = this.contenido.image;
      this.type = this.contenido.type;
      this.synopsis = this.contenido.synopsis;

      var usuario = JSON.parse(localStorage.getItem("currentUser"));
      //comprobamos si el contenido está en alguna lista del usuario
      this.dataservice.getListaVerLeer(usuario).subscribe((data:Array<VerLeer>)=>{
        this.verLeer = (data.map(d=>d.contenido._id).includes(this.contenido._id));
      })
      this.dataservice.getListaVistosLeidos(usuario).subscribe((data:Array<VistoLeido>)=>{
        this.vistoLeido = (data.map(d=>d.contenido._id).includes(this.contenido._id));
        if(this.vistoLeido){
          //si está en vistoLeido, vemos si la recomienda
          this.recomienda = data.filter(d=>d.contenido._id==this.contenido._id)[0].recomienda;
        }

        this.getResena();
        this.newResena.contenido = this.contenido;
        this.newResena.usuario = usuario;
        this.newVistoLeido.contenido = this.contenido
        this.newVistoLeido.usuario = usuario;
        this.newVistoLeido.recomienda = false;
        this.newVerLeer.contenido = this.contenido;
        this.newVerLeer.usuario = usuario;


      })
    })

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
