import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BehaviorSubject, Subject } from 'rxjs';

import { BooksService } from '@app/shared';

import { BillingInfoComponent } from './billing-info.component';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;

  const booksData = require('../../assets/books.json');

  const booksServiceSpy = {
    selectedBook$: new BehaviorSubject(booksData[0]),
    cartBooks$: new BehaviorSubject(booksData[0]),
    myBookCollection$: new BehaviorSubject(booksData[1]),
    resetCart$: new Subject<void>(),
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
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
