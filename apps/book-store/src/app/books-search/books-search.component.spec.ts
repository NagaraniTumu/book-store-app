import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { BooksService } from '@app/shared';

import { BooksSearchComponent } from './books-search.component';

describe('BooksSearchComponent', () => {
  let component: BooksSearchComponent;
  let fixture: ComponentFixture<BooksSearchComponent>;

  const booksData = require('../../assets/books.json');

  const booksServiceSpy = {
    getBooks: jest.fn(() => of(booksData)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksSearchComponent],
      imports: [HttpClientModule, FormsModule],
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
    fixture = TestBed.createComponent(BooksSearchComponent);
    component = fixture.componentInstance;
    component.searchValue = 'angular';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get books data on click of search button', () => {
    const btnSearch = fixture.debugElement.query(By.css('button'))
      .nativeElement;
    btnSearch.click();

    expect(component.books.length).toBe(booksData.length);
  });
});
