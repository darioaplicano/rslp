import { Component, OnInit, Inject } from '@angular/core';
import { Contenido } from '../modelos/contenido';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resena } from '../modelos/resena';
import { VerLeer } from '../modelos/verLeer';

@Component({
  selector: 'app-content-config',
  templateUrl: './content-config.component.html',
  styleUrls: ['./content-config.component.css']
})
export class ContentConfigComponent implements OnInit {
  model = new Contenido();
  deviceObjects = [{name: 'Película'}, {name: 'Libro'}];
  selectedDeviceObj;
  ListResena = 0;
  ListVerLeer = 0;
  ListVistoLeido = 0;

  constructor(private dataservice:DataService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get("idcontenido");
    this.dataservice.getContenidoPorId(id).subscribe((data:Contenido)=>{
      this.model = data;
      if(this.model.type == 'book')
        this.selectedDeviceObj = this.deviceObjects[1];
      else
        this.selectedDeviceObj = this.deviceObjects[0];
    });
  }

  onChangeObj(listado){
    if(listado == this.deviceObjects[0])
      this.model.type = 'movie';
    else
      this.model.type = 'book';
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
    this.dataservice.getResena(this.model._id).subscribe((d:Array<Resena>)=>{
      this.ListResena = d.length;
      for (var i=0; i<d.length; i++) {
        this.dataservice.deleteTComentarios(this.model._id).subscribe((data:{})=>{});
      }
    });

    this.dataservice.getTVerLeer(this.model._id).subscribe((e:Array<VerLeer>)=>{
      this.ListVerLeer = e.length;
      for (var i=0; i<e.length; i++) {
        this.dataservice.deleteTVerLeer(this.model._id).subscribe((data:{})=>{});
      }
    });

    this.dataservice.getTVistoLeido(this.model._id).subscribe((f:Array<VerLeer>)=>{
      this.ListVistoLeido = f.length;
      for (var i=0; i<f.length; i++) {
        this.dataservice.deleteTVistoLeido(this.model._id).subscribe((data:{})=>{});
      }
    });

    this.dataservice.deleteContenido(this.model._id).subscribe((data:{})=>{
      this.router.navigate(['home']);
    });
  }

}

@Component({
  selector: 'app-dialogo-confirmate',
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
  selector: 'app-dialogo-contentdelete',
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