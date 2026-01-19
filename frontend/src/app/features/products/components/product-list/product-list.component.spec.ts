import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { ProductList } from './product-list.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;

  const mockProducts: Product[] = [
    { id: '1', name: 'Product 1', price: '100', stock: 10 }
  ];

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['getProducts', 'deleteProduct']);

    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    mockProductsService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(component.products()).toEqual(mockProducts);
  });

  it('should delete product', () => {
    mockProductsService.deleteProduct.and.returnValue(of(void 0));
    mockProductsService.getProducts.and.returnValue(of([]));

    component.deleteProduct('1');

    expect(mockProductsService.deleteProduct).toHaveBeenCalledWith('1');
  });

  it('should not delete if id is undefined', () => {
    component.deleteProduct(undefined);

    expect(mockProductsService.deleteProduct).not.toHaveBeenCalled();
  });
});
