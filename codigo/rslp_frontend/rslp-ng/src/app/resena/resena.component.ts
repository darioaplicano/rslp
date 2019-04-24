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
  recomienda = false;
  vistoLeido = false;
  verLeer = false;
  lista;
  deviceObjects = [{name: 'Por ver/leer'}, {name: 'Visto/Leído'}, {name: 'Ninguno'}];
  selectedDeviceObj;

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
      });
      this.dataservice.getListaVistosLeidos(usuario).subscribe((data:Array<VistoLeido>)=>{
        this.vistoLeido = (data.map(d=>d.contenido._id).includes(this.contenido._id));
        if(this.vistoLeido == this.verLeer){
          this.lista = 2;
        }
        if(this.vistoLeido){
          //si está en vistoLeido, vemos si la recomienda
          this.recomienda = data.filter(d=>d.contenido._id==this.contenido._id)[0].recomienda;
          this.lista = 1;
        }
        if(this.verLeer){
          this.lista = 0;
        }
        this.selectedDeviceObj = this.deviceObjects[this.lista];
        this.getResena();
        this.newResena.contenido = this.contenido;
        this.newResena.usuario = usuario;
        this.newResena.valoracion = "0";
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

  onChangeObja(newObj) {
    alert(this.selectedDeviceObj == newObj);
  }

  onChangeObj(listado){
    /* Si se selecciona Por ver/leer en la lista */
    if(listado == this.deviceObjects[0]){
      /* Y estamos en la lista Visto/Leído */
      if(this.lista == 1){
        /* Eliminamos el contenido de Visto/Leído */
        this.dataservice.deletevistoLeido(this.newVistoLeido).subscribe((data:{})=>{
          /* Y creamos el contenido Por ver/leer */
          this.dataservice.createverLeer(this.newVerLeer).subscribe((data:{})=>{
          });
        });
        /* Y estamos en la lista Ninguno*/
      }else if(this.lista == 2){
        /* Creamos el contenido Por ver/leer */
        this.dataservice.createverLeer(this.newVerLeer).subscribe((data:{})=>{
        });
      }
      /* Reiniciamos la posición de la lista y que no está visto/leído */
      this.lista = 0;
      this.vistoLeido = false;
      /* Si selecciona Visto/Leído en la lista */
    }else if(listado == this.deviceObjects[1]){
      /* Y estamos en por ver/leer */
      if(this.lista == 0){
        /* Eliminamos el contenido por ver/leer */
        this.dataservice.deleteverLeer(this.newVerLeer).subscribe((data:{})=>{
          /* Creamos el contenido visto/leído */
          this.dataservice.createvistoLeido(this.newVistoLeido).subscribe((data:{})=>{
          });
        });
        /* Si estamos en ninguno */
      }else if(this.lista == 2){
        /* Creamos el contenido visto/leído */
        this.dataservice.createvistoLeido(this.newVistoLeido).subscribe((data:{})=>{
        });
      }
      /* Reiniciamos la posición de la lista y que si está visto/leído */
      this.lista = 1;
      this.vistoLeido = true;
      /* Si selecciona ninguno en la lista */
    }else if(listado == this.deviceObjects[2]){
      /* Si estamos en por ver/leer */
      if(this.lista == 0){
        /* Eliminamos por ver/leer */
        this.dataservice.deleteverLeer(this.newVerLeer).subscribe((data:{})=>{
        });
        /* Si estamos en visto/leído */
      }else if(this.lista == 1){
        /* Eliminamos visto/leído */
        this.dataservice.deletevistoLeido(this.newVistoLeido).subscribe((data:{})=>{
        });
      }
      /* Reiniciamos la posición de la lista y que no está visto/leído */
      this.lista = 2;
      this.vistoLeido = false;
    }
  }
}
