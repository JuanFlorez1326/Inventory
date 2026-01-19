import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductForm } from './product-form.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['createProduct']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProductForm, ReactiveFormsModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with fields', () => {
    expect(component.productForm.get('name')).toBeDefined();
    expect(component.productForm.get('price')).toBeDefined();
    expect(component.productForm.get('stock')).toBeDefined();
  });

  it('should validate form fields', () => {
    expect(component.productForm.valid).toBeFalsy();
    
    component.productForm.setValue({
      name: 'Test Product',
      price: '100',
      stock: 10
    });
    
    expect(component.productForm.valid).toBeTruthy();
  });

  it('should create product on valid form submission', () => {
    const mockProduct: Product = {
      name: 'Test Product',
      price: '100',
      stock: 10
    };

    mockProductsService.createProduct.and.returnValue(of({ ...mockProduct, id: '1' }));

    component.productForm.setValue(mockProduct);
    component.submitForm();

    expect(mockProductsService.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/list']);
  });
});
