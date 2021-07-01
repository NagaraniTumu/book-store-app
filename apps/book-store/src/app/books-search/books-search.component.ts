import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { concatMap, takeUntil, tap } from 'rxjs/operators';

import { Book, BooksService } from '@app/shared';

import { ROUTES, SEARCH_INPUT_PLACEHOLDER } from '../constants/app.constants';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
})
export class BooksSearchComponent implements OnInit, OnDestroy {
  public placeholder: string = SEARCH_INPUT_PLACEHOLDER;
  public searchValue: string;
  public books: Book[] = [];

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService, private _router: Router) {}

  ngOnInit(): void {
    this._booksService.recentSearch$
      .pipe(
        tap((serachKey) => (this.searchValue = serachKey)),
        concatMap(() => this._booksService.recentSearchResults$),
        takeUntil(this.unSubscribe$)
      )
      .subscribe((response: Book[]) => {
        this.books = response;
      });
  }

  public onSearch() {
    this._booksService.dispatchRecentSearch(this.searchValue);

    this._booksService
      .getBooks(this.searchValue)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book[]) => {
        this.books = response;

        this._booksService.dispatchRecentSearchResults(this.books);
      });
  }

  public onBookSelect(selectedBook: Book) {
    this._booksService.dispatchSelectedbook(selectedBook);

    this._router.navigate([ROUTES.BOOK_DETAIL]);
  }

  public ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
