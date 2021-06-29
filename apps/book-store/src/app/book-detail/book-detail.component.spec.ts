import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BehaviorSubject, of } from 'rxjs';

import { ArrayToStringPipe, BooksService, EllipsisPipe } from '@app/shared';

import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let router: Router;

  const booksData = require('../../assets/books.json');
  const booksServiceSpy = {
    selectedBook$: of(booksData[0]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [BookDetailComponent, ArrayToStringPipe, EllipsisPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to books search page when selected book not available', () => {
    booksServiceSpy.selectedBook$ = new BehaviorSubject(undefined);
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledWith(['/books-search']);
  });
});
