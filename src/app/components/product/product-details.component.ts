import { Component, OnInit } from '@angular/core';
import { Product } from '../../store/models/product';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from '../../store/service/comparison/compare.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private compareService: CompareService,
  ) {}

  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  addProductToCompare(product: Product) {
    this.compareService.addProductToCompare(product);
  }

  ngOnInit() {
    this.getProduct();
  }
}
