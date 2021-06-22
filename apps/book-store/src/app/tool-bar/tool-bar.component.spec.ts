import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToolBarComponent } from './tool-bar.component';

import { APP_TITLE } from '../constants/app.constants';

describe('ToolBarComponent', () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should render title as'Enlight'`, () => {
    const appTitle = fixture.nativeElement.querySelector('h1').textContent;
    expect(appTitle).toContain(APP_TITLE);
  });

  it('should emit an event on click of toolbar', () => {
    spyOn(component.toggleSideNav, 'emit');

    const btnMenu = fixture.debugElement.query(By.css('button')).nativeElement;
    btnMenu.click();

    expect(component.toggleSideNav.emit).toHaveBeenCalled();
  });
});
