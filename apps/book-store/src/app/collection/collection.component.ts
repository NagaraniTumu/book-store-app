import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksService, Collection } from '@app/shared';

import { LABELS } from '../constants/template.constants';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  public labels = LABELS;
  public collectionBooks: Collection[];

  public unSubscribe$ = new Subject<void>();

  constructor(private _booksService: BooksService) {}

  ngOnInit(): void {
    this._booksService.myBookCollecton$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response: Collection[]) => {
        this.collectionBooks = response;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
