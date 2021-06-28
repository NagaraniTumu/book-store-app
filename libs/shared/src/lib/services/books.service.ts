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

  getBooks(searchString: string): Observable<Book[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return this.httpClient
      .get<Book[]>(BOOKS_API_URL + searchString, httpOptions)
      .pipe(
        map((response) => response['items']),
        catchError((error) => {
          throw error;
        })
      );
  }
}
