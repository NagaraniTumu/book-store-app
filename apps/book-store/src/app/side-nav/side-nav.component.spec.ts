import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { BooksFacade } from '@app/books';

import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  const booksData = require('../../assets/books.json');

  const booksFacadeSpy = {
    cartBooks$: of([booksData[0]]),
    collectionBooks$: of([booksData[1], booksData[2]]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: BooksFacade,
          useValue: booksFacadeSpy,
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
    expect(component.cartBooksCount).toEqual(1);
  });

  it('should verify books count in collection', () => {
    expect(component.collectionBooksCount).toEqual(2);
  });
});
