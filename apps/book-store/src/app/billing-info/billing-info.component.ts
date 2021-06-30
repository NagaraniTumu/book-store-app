import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BillingInfo, Book, BooksService, Collection } from '@app/shared';

import {
  BUTTONS,
  PAGETITLE,
  PURCHASE_SUCCESS_MSG,
} from '../constants/template.constants';
import { FORM_VALIDATION_MSGS, REGEX } from '../constants/validation.constants';
import { ROUTES } from '../constants/app.constants';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit, OnDestroy {
  public pageTitle = PAGETITLE;
  public buttons = BUTTONS;
  public validationMsgs = FORM_VALIDATION_MSGS;

  public billingInfoForm: FormGroup;
  public selectedBook: Book;
  public cartBooks: Book[];
  public previousUrl: string;

  public unSubscribe$ = new Subject<void>();

  constructor(
    private _booksService: BooksService,
    private _router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createBillingInfoForm();

    this._booksService.selectedBook$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book) => {
        this.selectedBook = response;
      });

    this._booksService.cartBooks$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book[]) => {
        this.cartBooks = response;
      });
  }

  public createBillingInfoForm() {
    this.billingInfoForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX.Name),
        Validators.maxLength(25),
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX.Phone),
      ]),
      address: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    this.configureCollectionData();

    this.openSnackbar();

    this._router.navigate([ROUTES.COLLECTION]);
  }

  public configureCollectionData() {
    if (this._router.url && this._router.url.includes('cart')) {
      this.addCartBooksToCollection();
    } else {
      this.addSelectedBookToCollection();
    }

    this._booksService.resetCart$.next();
    this._booksService.resetCollection$.next();
  }

  public addCartBooksToCollection(): void {
    const collection: Collection[] = [];

    this.cartBooks.forEach((item) => {
      collection.push({
        bookInfo: item,
        billingInfo: this.getBillingInfo(),
      });
    });

    this._booksService.myBookCollection$.next([
      ...this._booksService.myBookCollection$.getValue(),
      ...collection,
    ]);

    this._booksService.cartBooks$.next([]);
  }

  public addSelectedBookToCollection(): void {
    const collection: Collection = {
      bookInfo: this.selectedBook,
      billingInfo: this.getBillingInfo(),
    };

    this._booksService.myBookCollection$.next([
      ...this._booksService.myBookCollection$.getValue(),
      ...[collection],
    ]);

    this.removeSelectedBookFromCart();
  }

  public getBillingInfo(): BillingInfo {
    return {
      fullName: this.billingInfoForm.value.fullName,
      email: this.billingInfoForm.value.email,
      phoneNumber: this.billingInfoForm.value.phoneNumber,
      address: this.billingInfoForm.value.address,
    };
  }

  public removeSelectedBookFromCart(): void {
    const booksInCart: Book[] = this._booksService.cartBooks$.getValue();

    booksInCart.forEach((item, index) => {
      if (item.id === this.selectedBook.id) {
        booksInCart.splice(index, 1);
      }
    });

    this._booksService.cartBooks$.next(booksInCart);
  }

  public openSnackbar() {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = 2000;

    this.snackBar.open(PURCHASE_SUCCESS_MSG, undefined, config);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
