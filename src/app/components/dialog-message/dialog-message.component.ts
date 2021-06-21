import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  message: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.message = data.messageTitle;
  }
  ngOnInit(): void {
  }

}
