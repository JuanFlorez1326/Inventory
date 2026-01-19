import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment.development';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', price: '100', stock: 10 }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {
    const newProduct: Product = { name: 'New Product', price: '150', stock: 20 };
    const createdProduct: Product = { ...newProduct, id: '1' };

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(createdProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(createdProduct);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
