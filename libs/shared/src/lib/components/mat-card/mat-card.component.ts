import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss'],
})
export class MatCardComponent {
  @Input()
  public book: {
    title: string;
    subtitle: string;
    imageSrc: string;
    description: string;
    authors: string[];
  };
}
