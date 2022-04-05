import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm-component',
  templateUrl: './confirm-component.component.html'
})
export class ConfirmComponentComponent implements OnInit {

  constructor(private dialogReg: MatDialogRef<ConfirmComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {
  }


    borrar(){
      this.dialogReg.close(true);
  } 

  cancelar(){
    this.dialogReg.close();
  }



}
