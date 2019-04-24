import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.css']
})
export class UserconfigComponent implements OnInit {

  model = new Usuario();
  confirmation_passwd: string; 
  original_passwd: string;
  constructor( private usuarioService:DataService, public dialog: MatDialog, private snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
    this.model = JSON.parse(localStorage.getItem("currentUser"));
    this.original_passwd = this.model.contrasena;
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogoPasswd, {
      width: '500px',
      data:{passwd: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.confirmation_passwd = result.passwd;
        this.update(); 
      }
    });
  }

  update(){
    if(this.confirmation_passwd == this.original_passwd){
      this.usuarioService.updateUsuario(this.model).subscribe((data:{}) => {
        localStorage.setItem('currentUser', JSON.stringify(this.model));
        this.model = JSON.parse(localStorage.getItem("currentUser"));
        this.original_passwd = this.model.contrasena;
        this.snackBar.open('Datos actualizados', "Ok", {duration: 2000});
      });
    }
    else{
      this.openDialog();
      this.snackBar.open('Contraseña incorrecta', "Ok");
    }
  }

  delete() {
    const dialogRef = this.dialog.open(DialogoDelete, {
      width: '500px',
      data:{passwd: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.confirmation_passwd = result.passwd;
        this.deleteUser();
      }
    });
  }

  
  deleteUser(){
    if(this.original_passwd==this.confirmation_passwd){
      this.usuarioService.deleteUsuario(this.model).subscribe(() => {
        localStorage.removeItem('currentUser')
        this.router.navigate(['login']);
      });
    }
    else{
      this.delete();
      this.snackBar.open('Contraseña incorrecta', "Ok");
    }
  }
}

export interface DialogData {
  passwd: string;
}

@Component({
  selector: 'app-dialogo-passwd',
  templateUrl: 'dialogo-passwd.html',
  styleUrls: ['dialogo-passwd.css']
})
export class DialogoPasswd {

  constructor(public dialogRef: MatDialogRef<DialogoPasswd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClickCancel(): void {
    this.dialogRef.close();
  }
  clickOn():void {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: 'dialogo-delete.html',
  styleUrls: ['dialogo-passwd.css']
})
export class DialogoDelete {

  constructor(public dialogRef: MatDialogRef<DialogoDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClickCancel(): void {
      this.dialogRef.close();
    }
    clickOn():void {
      this.dialogRef.close(this.data);
    }
}