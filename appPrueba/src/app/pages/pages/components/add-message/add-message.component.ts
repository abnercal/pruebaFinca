import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/core/services/message.service';
import { MessageItem } from '../../../../core/models/message';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  formMessage: FormGroup;
  message: MessageItem;

  constructor(
    public dialogRef: MatDialogRef<AddMessageComponent>,
    private _snackBar: MatSnackBar, 
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.formMessage = new FormGroup({
      msg: new FormControl(null, Validators.required),
      tags: new FormControl(null, Validators.required),
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  addMessage(): void {
    if (!this.formMessage.valid) {
      this._snackBar.open('Llene todos los campos','',{duration: 2000});
      return;
    }

    this.message = {
      message: this.formMessage.value.msg,
      tags: this.formMessage.value.tags
    }
    
    this.messageService.sendMessage(this.message).subscribe((res: any) => {
      this._snackBar.open('Credenciales Registradas Correctamente StatusCode: 204' ,'',{duration: 2000});
      this.dialogRef.close();

    })
  }

}
