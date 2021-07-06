import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';

import { Book } from '../models/book.model';

import { BOOKS_API_URL } from '../constants/api.constants';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const rawBooksData = require('../assets/books-raw.json');

  const booksData: Book[] = [
    {
      id: 'BHs2DwAAQBAJ',
      title: 'Learning Angular',
      subtitle: 'A Hands-On Guide to Angular 2 and Angular 4',
      authors: ['Brad Dayley', 'Brendan Dayley', 'Caleb Dayley'],
      publisher: 'Addison-Wesley Professional',
      description: 'Second Edition A Hands-On Guide to Angular 2',
      thumbnail: 'http://books.google.com/books/content?id=BHs2',
      pageCount: 240,
      language: 'un',
      price: 2232.93,
      currencyCode: 'INR',
      rating: 3,
    },
    {
      id: 'nLkrDwAAQBAJ',
      title: 'Angular Router',
      subtitle: 'Angular Router',
      authors: ['Victor Savkin'],
      publisher: 'Packt Publishing Ltd',
      description: 'Angular Router',
      thumbnail: 'http://books.google.com/books/content?id=nLkr',
      pageCount: 118,
      language: 'en',
      price: 2252.61,
      currencyCode: 'INR',
      rating: 5,
    },
  ];

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

  it('should getBooks method return list of books', () => {
    service.getBooks('angular').subscribe((books) => {
      expect(books.length).toBe(booksData.length);
      expect(books).toEqual(booksData);
    });

    const request = httpMock.expectOne(`${BOOKS_API_URL}angular`);
    expect(request.request.method).toBe('GET');
    request.flush(rawBooksData);
  });

  it('should getBooks method throw an error', () => {
    service.getBooks('angular').subscribe(
      () => {},
      (error) => {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual('Internal Server Error');
      }
    );

    const testRequest = httpMock.expectOne(`${BOOKS_API_URL}angular`);
    testRequest.flush('error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
