import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ArrayToStringPipe } from '../../pipes/array-to-string/array-to-string.pipe';
import { EllipsisPipe } from '../../pipes/ellipsis/ellipsis.pipe';

import { MatCardComponent } from './mat-card.component';

describe('MatCardComponent', () => {
  let component: MatCardComponent;
  let fixture: ComponentFixture<MatCardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatCardComponent, EllipsisPipe, ArrayToStringPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.book = {
      title: 'Learning Angular',
      subtitle: 'A Hands-On Guide to Angular 2 and Angular 4',
      description: 'Learning Angular teaches modern application development',
      imageSrc:
        'http://books.google.com/books/content?id=BHs2DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      authors: ['Brad Dayley', 'Brendan Dayley', 'Caleb Dayley'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render book information', () => {
    const cardTitle = debugElement.query(By.css('mat-card-title'))
      .nativeElement;
    const cardSubtitle = debugElement.query(By.css('mat-card-subtitle'))
      .nativeElement;
    const cardFooter = debugElement.query(By.css('mat-card-footer'))
      .nativeElement;
    const cardContent = debugElement.query(By.css('mat-card-content > p'))
      .nativeElement;

    expect(cardTitle.textContent).toEqual('Learning Angular');
    expect(cardSubtitle.textContent).toEqual(
      'A Hands-On Guide to Angular 2 and Angular 4'
    );
    expect(cardContent.textContent).toEqual(
      'Learning Angular teaches modern application development'
    );
    expect(cardFooter.textContent).toEqual(
      'Written by:Brad Dayley, Brendan Dayley and Caleb Dayley'
    );
  });
});
