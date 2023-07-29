import {Component} from '@angular/core';
import {ProductType} from "../../../types/product-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService,
              private router: Router, private productService: ProductService) {
    this.product = {
      id: 0,
      image: " ",
      title: " ",
      price: 0,
      description: " "
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {

        this.productsService.getProducts()
          .subscribe({
            next: (data) => {
              const element = data.find(item => item.id === +params['id']);
              if (element) {
                this.product = element;
                this.productService.productTitle = element.title;
              } else {
                this.router.navigate(['/']);
              }
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

}
