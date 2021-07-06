import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { BooksFacade } from '@app/books';

import { BooksSearchComponent } from './books-search.component';

describe('BooksSearchComponent', () => {
  let component: BooksSearchComponent;
  let fixture: ComponentFixture<BooksSearchComponent>;
  let router: Router;

  const booksData = require('../../assets/books.json');

  const booksFacadeSpy = {
    recentSearch$: of('angular'),
    allBooks$: of(booksData),
    dispatchBooks: jest.fn(),
    dispatchSelectedBookId: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksSearchComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: BooksFacade,
          useValue: booksFacadeSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BooksSearchComponent);
    component = fixture.componentInstance;
    component.searchValue = 'angular';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify list of books', () => {
    expect(component.books.length).toEqual(3);
  });

  it('should get books data on click of search button', () => {
    const btnSearch = fixture.debugElement.query(By.css('button'))
      .nativeElement;
    btnSearch.click();

    expect(component.books.length).toBe(booksData.length);
  });

  it('should navigate to book detail page on click of book tile', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.onBookSelect(booksData[0]);

    expect(routerSpy).toHaveBeenCalledWith(['./book-detail']);
  });
});
