import * as core from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@core.Component({
  selector: 'app-anadir-peliculas',
  templateUrl: './anadir-peliculas.component.html',
  styleUrls: ['./anadir-peliculas.component.css']
})
export class AnadirPeliculasComponent implements core.OnInit {
  
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
