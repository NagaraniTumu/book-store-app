import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';

import { BOOKS_API_URL } from '../constants/api.constants';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const booksData = {
    items: [
      {
        title: 'Learning Angular',
        subtitle: 'A Hands-On Guide to Angular 2 and Angular 4',
        description: 'Learning Angular teaches modern application development',
        imageSrc: 'http://books.google.com/books/content?id=BHs2DwAAQBAJ',
        authors: ['Brad Dayley', 'Brendan Dayley', 'Caleb Dayley'],
      },
      {
        title: 'Angular Momentum in Quantum Mechanics',
        subtitle: 'A Hands-On Guide to Angular Momentum',
        description: 'This book offers an introduction to the angular momentum',
        imageSrc: 'http://books.google.com/books/content?id=BHs2DwAAQBAJ',
        authors: ['A. R. Edmonds', 'Caleb Dayley'],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of books', () => {
    service.getBooks('angular').subscribe((books) => {
      expect(books.length).toBe(booksData.items.length);
      expect(books).toEqual(booksData['items']);
    });

    const request = httpMock.expectOne(`${BOOKS_API_URL}angular`);
    expect(request.request.method).toBe('GET');
    request.flush(booksData);
  });
});
