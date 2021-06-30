import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BrowserModule, By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BehaviorSubject, Subject } from 'rxjs';

import {
  ArrayToStringPipe,
  Book,
  BooksService,
  EllipsisPipe,
} from '@app/shared';

import { CartComponent } from './cart.component';

import { ROUTES } from '../constants/app.constants';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;

  const booksData = require('../../assets/books.json');

  const booksServiceSpy = {
    cartBooks$: new BehaviorSubject([booksData[0], booksData[1]]),
    resetCart$: new Subject<void>(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, EllipsisPipe, ArrayToStringPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify list of books in cart', () => {
    expect(component.cartBooks.length).toEqual(2);
  });

  it('should navigate to billing info page on click of Proceed to purchase button', () => {
    const routerSpy = spyOn(router, 'navigate');

    const btnPurchase = fixture.debugElement.query(By.css('#btnPurchase'))
      .nativeElement;
    btnPurchase.click();

    expect(routerSpy).toHaveBeenCalledWith([ROUTES.CART_BILLING]);
  });

  it('should navigate to billing info page on click of Proceed to purchase button', () => {
    const routerSpy = spyOn(router, 'navigate');

    const btnPurchase = fixture.debugElement.query(By.css('#btnPurchase'))
      .nativeElement;
    btnPurchase.click();

    expect(routerSpy).toHaveBeenCalledWith([ROUTES.CART_BILLING]);
  });

  it('should remove selected book from cart on click of remove icon', () => {
    booksServiceSpy.cartBooks$.subscribe((cartbooks: Book[]) => {
      expect(cartbooks.length).toEqual(2);
    });

    const btnPurchase = fixture.debugElement.query(By.css('#btnRemove-0'))
      .nativeElement;
    btnPurchase.click();

    booksServiceSpy.cartBooks$.subscribe((cartBooks: Book[]) => {
      expect(cartBooks.length).toEqual(1);
    });
  });

  it('should navigate to books search page when no books available in cart', () => {
    const routerSpy = spyOn(router, 'navigate');

    const btnPurchase0 = fixture.debugElement.query(By.css('#btnRemove-0'))
      .nativeElement;
    btnPurchase0.click();

    booksServiceSpy.cartBooks$.subscribe((cartBooks: Book[]) => {
      expect(cartBooks.length).toEqual(0);
    });

    expect(routerSpy).toHaveBeenCalledWith([ROUTES.BOOKS_SEARCH]);
  });
});
