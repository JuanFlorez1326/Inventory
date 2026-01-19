import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductList implements OnInit {
  private productService = inject(ProductsService);

  public products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products.set(data);
    });
  }

  deleteProduct(id: string | undefined): void {
    if (!id) return;
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
