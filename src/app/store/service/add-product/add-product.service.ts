import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AddProductModel} from '../../models/add-product.model';
import {Observable, Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogMessageComponent} from '../../../components/dialog-message/dialog-message.component';
import {DialogService} from "../dialog/dialog.service";

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private addProductUrl = `${environment.url}/api/v1/product/add`;
  private httpOptions = {observe: 'response' as const};
  private allMaterialsUrl = `${environment.url}/api/v1/material/all`;
  private allColorsUrl = `${environment.url}/api/v1/color/all`;
  private allSizesUrl = `${environment.url}/api/v1/size/all`;
  private allCategoryUrl = `${environment.url}/api/v1/category/all`;
  private imgUrl = `${environment.url}/api/v1/images`;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }

  addNewProduct(addProductData: AddProductModel): Observable<any> {
    console.log(this.httpOptions);
    return this.http.post<AddProductModel>(
      this.addProductUrl,
      addProductData,
      this.httpOptions
    );
  }

  public uploadImage(image: File, id: number): Subscription {
    const formData = new FormData();
    formData.append('image', image);
    return this.http
      .post(`${this.imgUrl}/${id}`, formData)
      .subscribe((response) => {
        this.dialogService.openMessage(
          'Photo has been uploaded',
          'Close'
        );
      });
  }

  getAllMaterials(): Observable<any> {
    return this.http.get(`${this.allMaterialsUrl}`);
  }

  getAllColors(): Observable<any> {
    return this.http.get(`${this.allColorsUrl}`);
  }

  getAllSizes(): Observable<any> {
    return this.http.get(`${this.allSizesUrl}`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.allCategoryUrl}`);
  }

  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      messageTitle: title,
    };
    this.dialog.open(DialogMessageComponent, dialogConfig);
  }
}
