import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/core/services/message.service';
import { MessageResponse } from '../../../../core/models/message';
import { AddMessageComponent } from '../add-message/add-message.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  loading = true;
  formID: FormGroup;
  formTAG: FormGroup;

  dataSource: MessageResponse[] = [];

  displayedColumns: string[] = ['ID', 'message', 'tags'];
  constructor(
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    //Getting all messages
    this.getAllMessages();

    this.formID = new FormGroup({
      searchID: new FormControl(null, Validators.required),
    });
    this.formTAG = new FormGroup({
      searchTAG: new FormControl(null, Validators.required),
    });
  }

  getAllMessages(): void {
    this.loading = true;
    this.messageService.getAllMessages().subscribe((res: any) => {
      this.dataSource = res.msgs;
      this.loading = false;
    });
  }

  addMessage(): void {
    const dialogo = this.dialog.open(AddMessageComponent);
    dialogo.afterClosed().subscribe( res => {
      this.getAllMessages();
    });
  }

  findMessageByID(): void {
    this.loading = true;
    this.dataSource = [];
    const id = this.formID.value.searchID;
    this.messageService.findByID(id).subscribe((res: any) => {
      this.dataSource.push(res.msg);
      this.loading = false;
    });
  }

  
  findMessageByTAG(): void {
    this.loading = true;
    this.dataSource = [];
    const TAG = this.formTAG.value.searchTAG;
    this.messageService.findByTag(TAG).subscribe((res: any) => {
      this.dataSource = res.msgs;
      this.loading = false;
    });
  }
}
