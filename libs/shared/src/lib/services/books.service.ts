import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Book } from '../models/book.model';

import { BOOKS_API_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  public getBooks(searchString: string): Observable<Book[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return this.httpClient
      .get<Book[]>(BOOKS_API_URL + searchString, httpOptions)
      .pipe(
        map((response) => {
          const booksList: Book[] = this.configureBookData(response['items']);

          return booksList;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  public configureBookData(response): Book[] {
    return response.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      subtitle: item.volumeInfo.subtitle,
      publisher: item.volumeInfo.publisher,
      description: item.volumeInfo.description,
      authors: item.volumeInfo.authors,
      pageCount: item.volumeInfo.pageCount,
      rating: item.volumeInfo ? item.volumeInfo.averageRating : 0,
      thumbnail:
        item.volumeInfo && item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.smallThumbnail
          : '',
      language: item.volumeInfo.language,
      price: item.saleInfo.retailPrice ? item.saleInfo.retailPrice.amount : 0,
      currencyCode: item.saleInfo.retailPrice
        ? item.saleInfo.retailPrice.currencyCode
        : '',
    }));
  }
}
