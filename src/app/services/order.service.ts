import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormValueType} from "../types/form-value-type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  sendOrder(data: {
    name: string, last_name: string, phone: string, country: string, zip: string, address: string,
    product: string, comment?: string}) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }
}



