import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() name:string | undefined;
  @Input() url:string | undefined;

  constructor() {
    console.log(this.name, this.url);
  }

}
