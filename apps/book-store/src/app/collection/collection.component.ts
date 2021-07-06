import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksFacade } from '@app/books';
import { Collection } from '@app/shared';

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

  constructor(private _booksFacade: BooksFacade) {}

  ngOnInit(): void {
    this._booksFacade.collectionBooks$
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
