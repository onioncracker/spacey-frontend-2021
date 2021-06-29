import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckoutOrder} from "../../store/models/checkout-order";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Output() commentEvent = new EventEmitter<string>();
  comment = '';

  onChangeComment() {
    this.commentEvent.emit(this.comment);
  }
}
