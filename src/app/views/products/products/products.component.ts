import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {map, Subject, Subscription, tap} from "rxjs";
import {ProductType} from "../../../../types/product-type";
import {ProductsService} from "../../../shared/services/products.service";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  @ViewChild('products')
  private productsElement!: ElementRef;

  products: ProductType[] = [];
  foundProducts: ProductType[] = [];
  loading: boolean = false;
  notFound: boolean = true;
  isDone: boolean = false;
  idParam: string = '';

  subject: Subject<string>;
  productsTitleDefault: string;
  private subscription: Subscription | null = null;
  value: string = this.productService.inputNavbarValue;


  constructor(private productsService: ProductsService, private router: Router,
              private productService: ProductService) {
    this.productsTitleDefault = this.productsService.productsTitle;

    this.subject = new Subject<string>();

  }


  getProductsTitle() {
    return this.productsService.productsTitle;
  }


  ngOnInit() {

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


    // this.subscription = this.subject.subscribe((param: string) => {
    //   this.productsService.productsTitle = `Результаты поиска по запросу "${param}"`;
    //
    //
    //   if (param) {
    //     this.isDone = true;
    //     let id: string = '';
    //
    //     this.productService.getProduct(param)
    //       .pipe(
    //         tap(item => {
    //           for (const prop in item) {
    //             console.log(item[prop]);
    //           }
    //         }), //id = Object.keys(item)[0]
    //       )
    //       .subscribe(
    //         {
    //           next: (data) => {
    //             console.log(data);
    //           },
    //           error: (error) => {
    //             console.log(error);
    //           }
    //         }
    //       )
    //   } else {
    //     this.productsService.productsTitle = this.productsTitleDefault;
    //     this.loading = true;
    //
    //     this.productsService.getProducts()
    //       .pipe(
    //         tap(() => {
    //           this.loading = false;
    //         })
    //       )
    //       .subscribe({
    //         next: data => {
    //           this.products = data;
    //         },
    //         error: (error) => {
    //           console.log(error);
    //           this.router.navigate(['/']);
    //         }
    //       })
    //   }
    //
    // })
    //
    // this.subject.next(this.value);

  }
}


// if (this.isDone && Array.isArray(this.foundProducts)) {
//   this.products = [];
//   this.notFound = true;
// } else if (this.isDone && ! Array.isArray(this.foundProducts)) {
//   this.products = this.foundProducts;
// } else {
//   this.loading = true;
//
//   this.productsService.getProducts()
//     .pipe(
//       tap(() => {
//         this.loading = false;
//       })
//     )
//     .subscribe({
//       next: data => {
//         this.products = data;
//       },
//       error: (error) => {
//         console.log(error);
//         this.router.navigate(['/']);
//       }
//     })
// }
