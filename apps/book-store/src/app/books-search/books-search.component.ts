import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { concatMap, takeUntil, tap } from 'rxjs/operators';

import { BooksFacade } from '@app/books';
import { Book } from '@app/shared';

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

  constructor(private _booksFacade: BooksFacade, private _router: Router) {}

  ngOnInit(): void {
    this._booksFacade.recentSearch$
      .pipe(
        tap((serachKey) => (this.searchValue = serachKey)),
        concatMap(() => this._booksFacade.allBooks$),
        takeUntil(this.unSubscribe$)
      )
      .subscribe((response: Book[]) => {
        this.books = response;
      });
  }

  public onSearch() {
    this._booksFacade.dispatchBooks(this.searchValue);
  }

  public onBookSelect(selectedBook: Book) {
    this._booksFacade.dispatchSelectedBookId(selectedBook.id);

    this._router.navigate([ROUTES.BOOK_DETAIL]);
  }

  public ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
