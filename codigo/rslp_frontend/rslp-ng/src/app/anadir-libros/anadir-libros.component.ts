import {Component} from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** @title Simple form field */
@Component({
  selector: 'form-field-overview-example',
  templateUrl: 'form-field-overview-example.html',
  styleUrls: ['form-field-overview-example.css'],
})
export class FormFieldOverviewExample {}

@Component({
  selector: 'app-anadir-libros',
  templateUrl: './anadir-libros.component.html',
  styleUrls: ['./anadir-libros.component.css']
})
export class AnadirLibroComponent implements OnInit {
  
  model = new Libro();

  constructor(private libroService: DataService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.libroService.createLibro(this.model).subscribe((data:{}) => {
      localStorage.setItem('currentLibro', JSON.stringify(data));
      this.router.navigate(['home']);
    });
  }

}