import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../../components/dialog-message/dialog-message.component';
import { AddAuction } from '../../models/add-auction';

@Injectable({
  providedIn: 'root',
})
export class AddAuctionService {
  private addAuctionUrl = `${environment.url}/api/v1/auction/add`;
  private allProductsUrl = `${environment.url}/api/v1/products`;
  private allSizesUrl = `${environment.url}/api/v1/size/all`;
  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  addNewAuction(addAuctionData: AddAuction): Observable<any> {
    return this.http.post<AddAuction>(
      this.addAuctionUrl,
      addAuctionData,
      this.httpOptions
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.allProductsUrl}`);
  }

  getAllSizes(): Observable<any> {
    return this.http.get(`${this.allSizesUrl}`);
  }

  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      messageTitle: title,
    };
    this.dialog.open(DialogMessageComponent, dialogConfig);
  }
}
