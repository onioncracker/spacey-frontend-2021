import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuctionModel } from '../../models/auction.model';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private auctionUrl = `${environment.url}/api/v1/auction`;

  constructor(private http: HttpClient) {}

  getAllAuctions(): Observable<AuctionModel[]> {
    return this.http.get<AuctionModel[]>(`${this.auctionUrl}/all`);
  }

  getAuctionById(id: number): Observable<AuctionModel> {
    return this.http.get<AuctionModel>(`${this.auctionUrl}/${id}`);
  }
}
