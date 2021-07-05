import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditAuction } from '../../models/edit-auction';
import { AuctionBidModel } from '../../models/auction-bid.model';

@Injectable({
  providedIn: 'root',
})
export class EditAuctionService {
  private editAuctionUrl = `${environment.url}/api/v1/auction`;
  private deleteAuctionUrl = `${environment.url}/api/v1/auction/delete`;
  private updateBidUrl = `${environment.url}/api/v1/auction/update-bid`;
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

  updateAuctionById(editAuctionData: EditAuction, id: number): Observable<any> {
    return this.http
      .put(
        `${this.editAuctionUrl}/edit/${id}`,
        editAuctionData,
        this.httpOptions
      )
      .pipe();
  }

  updateBid(id: number, bid: number): Observable<AuctionBidModel> {
    let auctionBid = new AuctionBidModel(id, bid);
    return this.http.put<AuctionBidModel>(this.updateBidUrl, auctionBid);
  }
}
