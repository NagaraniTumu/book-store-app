import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BehaviorSubject, Subject } from 'rxjs';

import { BooksService } from '@app/shared';

import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  const booksData = require('../../assets/books.json');

  const booksServiceSpy = {
    resetCart$: new Subject(),
    resetCollection$: new Subject(),
    cartBooks$: new BehaviorSubject([]),
    myBookCollection$: new BehaviorSubject([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify length of side nav list', () => {
    const matSideNavField = fixture.debugElement.nativeElement.querySelectorAll(
      'mat-nav-list a'
    );
    expect(matSideNavField.length).toBe(3);
  });

  it('should verify books count in cart', () => {
    booksServiceSpy.cartBooks$ = new BehaviorSubject([booksData[0]]);
    booksServiceSpy.resetCart$.next();

    expect(component.cartBooksCount).toEqual(1);
  });

  it('should verify books count in collection', () => {
    booksServiceSpy.myBookCollection$ = new BehaviorSubject([
      booksData[1],
      booksData[2],
    ]);
    booksServiceSpy.resetCollection$.next();

    expect(component.collectionBooksCount).toEqual(2);
  });
});
