import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book, BooksService } from '@app/shared';

import { ROUTES } from '../constants/app.constants';
import { BUTTONS } from '../constants/template.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public buttons = BUTTONS;
  public cartBooks: Book[];

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService, private _router: Router) {}

  ngOnInit(): void {
    this._booksService.cartBooks$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book[]) => {
        this.cartBooks = response;
      });
  }

  public onProceedToPurchase() {
    this._router.navigate([ROUTES.CART_BILLING]);
  }

  public onCartRemove(book: Book) {
    const booksInCart: Book[] = this._booksService.cartBooks$.getValue();

    booksInCart.forEach((item, index) => {
      if (item.id === book.id) {
        booksInCart.splice(index, 1);
      }
    });

    this._booksService.dispatchBooksToCart(booksInCart);

    if (booksInCart.length === 0) {
      this._router.navigate([ROUTES.BOOKS_SEARCH]);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
