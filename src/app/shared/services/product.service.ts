import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product-type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productTitle: string = '';

  inputNavbarValue: string = '';


  constructor(private http:HttpClient) {
  }

  getProduct(param: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>("https://testologia.site/tea?search=" + param);
  }


}
