import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css', '../checkout/checkout.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input() checkout: any
  constructor() { }

  ngOnInit(): void {
  }
}
