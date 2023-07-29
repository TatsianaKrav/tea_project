import {Component, OnDestroy} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnDestroy {

  isSuccessful: boolean = false;
  isShown: boolean = false;


  constructor(private fb: NonNullableFormBuilder, private productService: ProductService,
              private orderService: OrderService) {
  }

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^(\\+)*([0-9]){11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[а-яА-я]+$')]],
    index: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.pattern('^[а-яА-я0-9\\-\\s\\/]*$')]],
    product: [{value: this.productService.productTitle, disabled: true}],
    comment: ['']
  })

  private subscriptionOrder: Subscription | null = null;

  createOrder() {

    this.subscriptionOrder = this.orderService.sendOrder({
      name: this.orderForm.get('name')!.value,
      last_name: this.orderForm.get('lastName')!.value,
      phone: this.orderForm.get('phone')!.value,
      country: this.orderForm.get('country')!.value,
      zip: this.orderForm.get('index')!.value,
      product: this.orderForm.get('product')!.value,
      address: this.orderForm.get('address')!.value,
      comment: this.orderForm.get('comment')?.value
    })
      .subscribe(response => {

        this.orderForm.setValue({
          name: '',
          lastName: '',
          phone: '',
          country: '',
          index: '',
          address: '',
          product: '',
          comment: ''
        })

        if (response.success && !response.message) {
          this.isSuccessful = true;
          this.isShown = false;

        } else {
          this.isSuccessful = false;
          this.isShown = true;
        }
      })
  }

  checkData(): boolean {
    return <boolean>(this.orderForm.get('name')?.invalid || this.orderForm.get('lastName')?.invalid
      || this.orderForm.get('phone')?.invalid || this.orderForm.get('country')?.invalid
      || this.orderForm.get('index')?.invalid || this.orderForm.get('address')?.invalid ||
      !this.orderForm.get('product')?.value);
  }


  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

}

