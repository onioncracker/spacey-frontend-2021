import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  @Input() checkout: any
  constructor() { }

  ngOnInit(): void {
  }

}
