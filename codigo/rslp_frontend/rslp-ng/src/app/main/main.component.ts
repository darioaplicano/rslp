import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private dataService:DataService) { }
  user: Usuario;
  seguidores: Array<Usuario>;
  numFollowers = 0;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.dataService.getSeguidores(this.user).subscribe((data: []) => {
      this.seguidores = data;
      console.log(this.seguidores)
    })
  }


}
