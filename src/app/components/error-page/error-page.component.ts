import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.errorMessage = this.getMessage();
  }

  private getMessage() : string {
    let message = "Oppps, something went wrong";
    if (history.state.errorMessage) {
      message = history.state.errorMessage;
    }
    return message;
  }

}
