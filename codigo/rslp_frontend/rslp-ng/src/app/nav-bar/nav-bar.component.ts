import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  query = "";
  user = null;
  constructor(public router: Router){
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }  
  public logout(){
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['login']);
  }
}
