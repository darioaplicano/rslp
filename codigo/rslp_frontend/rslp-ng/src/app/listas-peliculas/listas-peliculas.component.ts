import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../modelos/pelicula';

@Component({
  selector: 'app-listas-peliculas',
  templateUrl: './listas-peliculas.component.html',
  styleUrls: ['./listas-peliculas.component.css']
})
export class ListasPeliculasComponent implements OnInit {

  genreList = [];


  title:string = "";
  genre:Array<string> = [];
  director:string = "";
  recomended:boolean = false;

  orSeenList = []
  orToseeList = []

  seenList = [];
  toseeList = [];

  p1 = new Pelicula();
  p2 = new Pelicula();
  p2alt = new Pelicula();

  ngOnInit() {
    this.p1._id="1";
    this.p1.titulo="Captain Marvel";
    this.p1.director="Anna Boden";
    this.p1.recomendado=false;
    this.p1.genero="acción";
    this.p1.imagen="https://upload.wikimedia.org/wikipedia/en/8/85/Captain_Marvel_poster.jpg";

    this.p2._id="2";
    this.p2.titulo="Ghostbusters";
    this.p2.director="Ivan Reitman";
    this.p2.recomendado=true;
    this.p2.genero="comedia";
    this.p2.imagen="https://upload.wikimedia.org/wikipedia/en/2/2f/Ghostbusters_%281984%29_theatrical_poster.png";

    this.orSeenList=[this.p1,this.p2];

    this.p2alt = {...this.p2};
    this.p2alt.recomendado=false;
    this.orToseeList=[this.p1,this.p2alt];

    this.refresh();
  }

  refresh(){
    this.seenList = this.orSeenList;
    this.toseeList = this.orToseeList;
    this.genreList = this.seenList.map(movie=>movie.genero).concat(this.toseeList.map(movie=>movie.genero)).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }

  filter(){
    this.refresh();

    this.seenList = this.seenList.filter(m=>
      m.titulo.toLowerCase().includes(this.title.toLowerCase()) &&
      m.director.toLowerCase().includes(this.director.toLowerCase()) &&
      (this.genre.length==0 || this.genre.includes(m.genero)) &&
      (!this.recomended || m.recomendado)
    )

    this.toseeList = this.toseeList.filter(m=>
      m.titulo.toLowerCase().includes(this.title.toLowerCase()) &&
      m.director.toLowerCase().includes(this.director.toLowerCase()) &&
      (this.genre.length==0 || this.genre.includes(m.genero)) &&
      (!this.recomended || m.recomendado)
    )

    this.genreList = this.seenList.map(movie=>movie.genero).concat(this.toseeList.map(movie=>movie.genero)).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }
}
