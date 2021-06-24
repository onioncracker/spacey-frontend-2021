import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ManageProductsService } from '../../store/service/manage-products/manage-products.service';
import { MatPaginator } from '@angular/material/paginator';
import { Products } from '../../store/models/products';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'productId',
    'category',
    'name',
    'materials',
    'productSex',
    'color',
    'price',
    'discount',
    'action1',
    'action2',
  ];
  products!: Products[];
  dataSource = new MatTableDataSource<Products>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private manageProductsService: ManageProductsService
  ) {}

  getAllProductOnPage() {
    this.manageProductsService
      .getAllProducts()
      .pipe()
      .subscribe((data: Products[]) => {
        this.products = data;
        this.dataSource = new MatTableDataSource(this.products);
      });
  }

  ngOnInit(): void {
    this.getAllProductOnPage();
    this.dataSource.paginator! = this.paginator;
  }
}
