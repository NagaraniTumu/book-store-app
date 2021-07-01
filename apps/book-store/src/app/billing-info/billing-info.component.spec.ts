import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';

import { BooksService, Collection } from '@app/shared';

import { BillingInfoComponent } from './billing-info.component';

import { ROUTES } from '../constants/app.constants';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  const routerSpy = {
    url: '/book-detail/billing-info',
    navigate: jasmine.createSpy('navigate'),
  };

  const booksData = require('../../assets/books.json');

  const booksServiceSpy = {
    selectedBook$: new BehaviorSubject(booksData[0]),
    cartBooks$: new BehaviorSubject([booksData[0], booksData[1]]),
    myBookCollection$: new BehaviorSubject([]),
    dispatchBooksToCollection: jest.fn(),
    dispatchBooksToCart: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a selected book', () => {
    expect(component.selectedBook).toEqual(booksData[0]);
  });

  it('should get list of books in cart', () => {
    expect(component.cartBooks.length).toEqual(2);
  });

  it('should navigate to collection page on selected book purchase', () => {
    component.billingInfoForm.patchValue({
      fullName: 'testname',
      email: 'testname@yopmail.com',
      phoneNumber: '2345678901',
      address: 'sample address',
    });
    fixture.detectChanges();

    const btnSubmit = fixture.debugElement.query(By.css('.btnSubmit'))
      .nativeElement;
    btnSubmit.click();

    booksServiceSpy.myBookCollection$.subscribe((collection: Collection[]) => {
      expect(collection.length).toEqual(1);
    });

    const router = TestBed.inject(Router);
    expect(router.navigate).toHaveBeenCalledWith([ROUTES.COLLECTION]);
  });

  it('should navigate to collection page on cart books purchase', () => {
    routerSpy.url = '/cart/billing-info';

    component.billingInfoForm.patchValue({
      fullName: 'testname',
      email: 'testname@yopmail.com',
      phoneNumber: '2345678901',
      address: 'sample address',
    });
    fixture.detectChanges();

    const btnSubmit = fixture.debugElement.query(By.css('.btnSubmit'))
      .nativeElement;
    btnSubmit.click();

    booksServiceSpy.myBookCollection$.subscribe((collection: Collection[]) => {
      expect(collection.length).toEqual(2);
    });

    const router = TestBed.inject(Router);
    expect(router.navigate).toHaveBeenCalledWith([ROUTES.COLLECTION]);
  });
});
