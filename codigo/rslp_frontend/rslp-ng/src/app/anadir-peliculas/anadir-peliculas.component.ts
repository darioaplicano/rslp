import {Component} from '@angular/core';

/** @title Simple form field */
@Component({
  selector: 'form-field-overview-example',
  templateUrl: 'form-field-overview-example.html',
  styleUrls: ['form-field-overview-example.css'],
})
export class FormFieldOverviewExample {}

@Component({
  selector: 'app-anadir-peliculas',
  templateUrl: './anadir-peliculas.component.html',
  styleUrls: ['./anadir-peliculas.component.css']
})
export class AnadirPeliculasComponent implements OnInit {
  
  model = new Pelicula();

  constructor(private peliculaService: DataService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.peliculaService.createPelicula(this.model).subscribe((data:{}) => {
      localStorage.setItem('currentPelicula', JSON.stringify(data));
      this.router.navigate(['home']);
    });
  }

}