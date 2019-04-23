import { Component, OnInit, Inject } from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogoPasswd, DialogData } from '../userconfig/userconfig.component';

@Component({
  selector: 'app-content-config',
  templateUrl: './content-config.component.html',
  styleUrls: ['./content-config.component.css']
})
export class ContentConfigComponent implements OnInit {
  model = new Contenido();

  constructor(private dataservice:DataService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get("idcontenido");
    this.dataservice.getContenidoPorId(id).subscribe((data:Contenido)=>{
      this.model = data;
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogoConfirmate, {
      width: '500px',
      data:{passwd: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.update(); 
      }
    });
  }
  update(){
    this.dataservice.updateContenido(this.model).subscribe((data:{})=>{
      this.router.navigate(['resena/'+this.model._id]);
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DialogoContentDelete, {
      width: '500px',
      data:{passwd: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.deleteContent();
      }
    });
  }
  deleteContent(){
    this.dataservice.deleteContenido(this.model._id).subscribe((data:{})=>{
      this.router.navigate(['home']);
    });
  }

}

@Component({
  templateUrl: 'dialogo-confirmate.html',
  styleUrls: ['dialogo-confirmate.css']
})
export class DialogoConfirmate {

  constructor(public dialogRef: MatDialogRef<DialogoConfirmate>) {}

  onClickCancel(): void {
    this.dialogRef.close();
  }
  clickOn():void {
    this.dialogRef.close("actualizar");
  }
}

@Component({
  templateUrl: 'dialogo-contentdelete.html',
  styleUrls: ['dialogo-confirmate.css']
})
export class DialogoContentDelete {

  constructor(public dialogRef: MatDialogRef<DialogoContentDelete>) {}

    onClickCancel(): void {
      this.dialogRef.close();
    }
    clickOn():void {
      this.dialogRef.close('eliminar');
    }
}