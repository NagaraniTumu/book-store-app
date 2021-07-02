import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book, BooksService } from '@app/shared';

import { BUTTONS, LABELS } from '../constants/template.constants';
import { ROUTES } from '../constants/app.constants';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  public selectedBook: Book;
  public buttons = BUTTONS;
  public labels = LABELS;

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService, private _router: Router) {}

  ngOnInit(): void {
    this._booksService.selectedBook$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((selectedBook: Book) => {
        this.selectedBook = selectedBook;

        if (!this.selectedBook) {
          this._router.navigate([ROUTES.BOOKS_SEARCH]);
        }
      });
  }

  public onAddToCart(book: Book) {
    this.addBooksToCart(book);

    this._router.navigate([ROUTES.CART]);
  }

  public addBooksToCart(book: Book) {
    const cartBooks = [...this._booksService.cartBooks$.getValue(), ...[book]];
    this._booksService.dispatchBooksToCart(cartBooks);
  }

  public onBuy(book: Book) {
    this.addBooksToCart(book);

    this._router.navigate([ROUTES.DETAIL_BILLING]);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
