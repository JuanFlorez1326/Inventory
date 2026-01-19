import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/products`;
    return this.http.get<Product[]>(url);
  }

  public createProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/products`;
    return this.http.post<Product>(url, product);
  }

  public deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(url);
  }
  
}
