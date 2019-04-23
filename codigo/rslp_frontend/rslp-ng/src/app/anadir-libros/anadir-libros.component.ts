import * as core from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@core.Component({
  selector: 'app-anadir-libros',
  templateUrl: './anadir-libros.component.html',
  styleUrls: ['./anadir-libros.component.css']
})
export class AnadirLibrosComponent implements core.OnInit {
  
  model = new Contenido();

  constructor(private contenidoService: DataService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.contenidoService.createContenido(this.model).subscribe((data:{}) => {
      localStorage.setItem('currentContenido', JSON.stringify(data));
      this.router.navigate(['home']);
    });
  }

}
