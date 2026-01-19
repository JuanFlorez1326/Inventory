import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavButton } from '../../../shared/models/nav.interface';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
    public currentView = signal<string>('list');

    private router = inject(Router);
    private route = inject(ActivatedRoute);

    public buttons: NavButton[] = [
      { label: 'Lista de Productos', view: 'list' },
      { label: 'Nuevo Producto', view: 'form' }
    ];

    public navigate(view: string): void {
      this.currentView.set(view);
      this.router.navigate([view], { relativeTo: this.route });
    }
}
