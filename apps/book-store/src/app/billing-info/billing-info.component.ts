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

import { BooksFacade } from '@app/books';
import { BillingInfo, Book, Collection } from '@app/shared';

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
    private _booksFacade: BooksFacade,
    private _router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createBillingInfoForm();

    this._booksFacade.selectedBook$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Book) => {
        this.selectedBook = response;
      });

    this._booksFacade.cartBooks$
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
  }

  public addCartBooksToCollection(): void {
    const purchasedBooks: Collection[] = [];

    this.cartBooks.forEach((item) => {
      purchasedBooks.push({
        bookInfo: item,
        billingInfo: this.getBillingInfo(),
      });
    });

    this._booksFacade.dispatchBooksToCollection(purchasedBooks);

    this._booksFacade.clearCart();
  }

  public addSelectedBookToCollection(): void {
    const purchasedBook: Collection = {
      bookInfo: this.selectedBook,
      billingInfo: this.getBillingInfo(),
    };

    this._booksFacade.dispatchBooksToCollection([purchasedBook]);

    this._booksFacade.removeSelectedBookFromCart(this.selectedBook);
  }

  public getBillingInfo(): BillingInfo {
    return {
      fullName: this.billingInfoForm.value.fullName,
      email: this.billingInfoForm.value.email,
      phoneNumber: this.billingInfoForm.value.phoneNumber,
      address: this.billingInfoForm.value.address,
    };
  }

  public openSnackbar() {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = 2000;
    config.panelClass = 'green-snackbar';

    this.snackBar.open(PURCHASE_SUCCESS_MSG, undefined, config);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
