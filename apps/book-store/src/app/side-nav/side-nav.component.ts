import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book, BooksService, Collection } from '@app/shared';

import { SIDE_NAV_LIST_ITEMS } from '../constants/app.constants';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  public sideNavListItems = SIDE_NAV_LIST_ITEMS;

  public cartBooksCount: number;
  public collectionBooksCount: number;

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService) {}

  ngOnInit(): void {
    this._booksService.cartBooks$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((cartBooks: Book[]) => {
        this.cartBooksCount = cartBooks.length;
      });

    this._booksService.myBookCollection$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((collection: Collection[]) => {
        this.collectionBooksCount = collection.length;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
