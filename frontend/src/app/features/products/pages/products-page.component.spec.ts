import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsPageComponent } from './products-page.component';

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {};

    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list view by default', () => {
    expect(component.currentView()).toBe('list');
  });

  it('should navigate to view', () => {
    component.navigate('form');

    expect(component.currentView()).toBe('form');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['form'], { relativeTo: mockActivatedRoute });
  });

  it('should have navigation buttons', () => {
    expect(component.buttons.length).toBe(2);
    expect(component.buttons[0].view).toBe('list');
    expect(component.buttons[1].view).toBe('form');
  });
});
