import {Component} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  value: string = '';

  constructor(private productsService: ProductsService, private productService: ProductService, private router: Router) {

  }

  test() {
    this.productService.inputNavbarValue = this.value;
  }

}
