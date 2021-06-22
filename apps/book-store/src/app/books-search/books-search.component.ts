import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book, BooksService } from '@app/shared';

import { SEARCH_INPUT_PLACEHOLDER } from '../constants/app.constants';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
})
export class BooksSearchComponent implements OnDestroy {
  public placeholder: string = SEARCH_INPUT_PLACEHOLDER;
  public searchValue: string;
  public books: Book[] = [];

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService) {}

  public onSearch() {
    this._booksService
      .getBooks(this.searchValue)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book[]) => {
        this.books = response;
      });
  }

  public ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
