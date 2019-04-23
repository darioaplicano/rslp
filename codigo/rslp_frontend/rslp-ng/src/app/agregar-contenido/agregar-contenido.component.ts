import { Component, OnInit } from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-contenido',
  templateUrl: './agregar-contenido.component.html',
  styleUrls: ['./agregar-contenido.component.css']
})
export class AgregarContenidoComponent implements OnInit {
  model = new Contenido();
  deviceObjects = [{name: 'Película'}, {name: 'Libro'}];
  selectedDeviceObj;

  constructor(private dataservice:DataService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  }

  onChangeObj(listado){
    if(listado == this.deviceObjects[0])
      this.model.type = 'movie';
    else
      this.model.type = 'book';
  }

  onSubmit() {
    this.dataservice.createContenido(this.model).subscribe((data:Contenido) => {
      this.router.navigate(['resena',data._id]); 
    });
  }

}
