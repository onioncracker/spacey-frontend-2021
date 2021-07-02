import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogMessageComponent} from '../../../components/dialog-message/dialog-message.component';
import {ConfirmComponent} from '../../../components/confirm/confirm.component';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DialogInputComponent} from "../../../components/dialog-input/dialog-input.component";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogRefMessage!: MatDialogRef<DialogMessageComponent>;
  dialogRefConfirm!: MatDialogRef<ConfirmComponent>;
  dialogRefInput!: MatDialogRef<DialogInputComponent>;

  constructor(private dialog: MatDialog) {
  }

  public openMessage(messageText: string, buttonName: string) {
    this.dialogRefMessage = this.dialog.open(DialogMessageComponent, {
      data: {
        message: messageText,
        buttonName: buttonName,
      },
    });
  }

  public openConfirm(options) {
    this.dialogRefConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }

  public confirmed(): Observable<boolean> {
    return this.dialogRefConfirm.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }

  public openInput(options): void {
    this.dialogRefInput = this.dialog.open(DialogInputComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }

  public confirmedInput(): Observable<boolean> {
    return this.dialogRefConfirm.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }

  public getInputMessage(): Observable<string> {
    return this.dialogRefInput.afterClosed();
  }
}
