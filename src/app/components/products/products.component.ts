import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../store/models/product';
import { HeaderTitleService } from '../../store/service/header/header-title.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css'],
})
export class ProductsComponent implements OnInit {
  title = 'Women';

  products!: Product[];
  selectedColor = 'any';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private headerTitleService: HeaderTitleService
  ) {}

  getAllProducts() {
    this.productService
      .getAllProductsInPage()
      .pipe()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnInit() {
    this.headerTitleService.setTitle('Women');
    this.getAllProducts();
  }
}
