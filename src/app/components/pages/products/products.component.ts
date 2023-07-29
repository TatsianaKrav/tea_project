import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product-type";
import {ProductsService} from "../../../services/products.service";
import {Router} from "@angular/router";
import {Subject, Subscription, tap} from "rxjs";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products: ProductType[] = [];
  foundProducts: ProductType[] = [];
  loading: boolean = false;
  notFound: boolean = true;
  isDone: boolean = false;

  subject: Subject<string>;
  productsTitleDefault: string;
  private subscription: Subscription | null = null;
  value: string = this.productService.inputNavbarValue;


  constructor(private productsService: ProductsService, private router: Router,
              private productService: ProductService) {
    this.productsTitleDefault = this.productsService.productsTitle;

    this.subject = new Subject<string>();
    // this.subject.next(this.productService.inputNavbarValue);
    this.subject.next(this.value);


  }


  getProductsTitle() {
    return this.productsService.productsTitle;
  }


  ngOnInit() {

    this.subscription = this.subject.subscribe((param: string) => {
      this.productsService.productsTitle = `Результаты поиска по запросу "${param}"`;
      this.isDone = true;

      // if (param) {
      //   this.isDone = true;
      //   this.productsService.productsTitle = `Результаты поиска по запросу "${param}"`;

        this.productService.getProduct(param)
          .subscribe(
            {
              next: data => {
                console.log(data);
                this.foundProducts = data;
                console.log(this.foundProducts);
              },
              error: (error) => {
                console.log(error);
                // this.router.navigate(['/']);
              }
            }
          )
      // } else {
      //   this.productsService.productsTitle = this.productsTitleDefault;
      // }
    })


    if (this.isDone && !this.foundProducts) {
      this.products = [];
      this.notFound = true;
    } else if (this.isDone && this.foundProducts) {
      this.products = this.foundProducts;
      console.log(this.products);
    } else {
      this.loading = true;

      this.productsService.getProducts()
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: data => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })

    }

  }
}
