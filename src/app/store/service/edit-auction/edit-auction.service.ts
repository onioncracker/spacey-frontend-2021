import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditProduct } from '../../models/edit-product';
import {EditAuction} from "../../models/edit-auction";

@Injectable({
  providedIn: 'root',
})
export class EditAuctionService {
  private editAuctionUrl = `${environment.url}/api/v1/auction`;
  private deleteAuctionUrl = `${environment.url}/api/v1/auction/cancel`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAuctionById(id: number): Observable<any> {
    return this.http.get(`${this.editAuctionUrl}/${id}`);
  }

  deleteAuctionById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteAuctionUrl}/${id}`, this.httpOptions);
  }

  updateAuctionById(editAuctionData: EditAuction): Observable<any> {
    return this.http
      .put(
        `${this.editAuctionUrl}/edit/${editAuctionData.id}`,
        editAuctionData,
        this.httpOptions
      )
      .pipe();
  }
}
