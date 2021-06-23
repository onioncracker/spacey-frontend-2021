import {Component, Input, OnInit} from '@angular/core';
import {CheckoutDto} from "../../store/models/checkout";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})

export class PersonalInformationComponent implements OnInit {
  @Input() checkout!: CheckoutDto
  isAuthUser = true
  isEdit = false
  edit() {
    this.isAuthUser = !this.isAuthUser
  }
  constructor() { }

  ngOnInit(): void {
  }

}
