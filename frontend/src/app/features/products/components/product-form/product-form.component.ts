import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductForm implements OnInit {
  public productForm!: FormGroup;

  private productsService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
    });
  }

  public submitForm(): void {
    if (this.productForm.invalid) return;
    const product = this.productForm.value;
    
    this.productsService.createProduct(product).subscribe({
      next: (response) => {
        if(response && response.id) {
          this.productForm.reset();
          this.router.navigate(['/products/list']);
        }
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      }
    });

  }
}