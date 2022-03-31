import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  styleUrls: ['./star.component.css'],
  templateUrl: './star.component.html',
})
export class StarComponent implements OnChanges {
  cropWidth: number = 4;
  @Input() rating: number = 75;

  @Output() clickSurLesEtoiles : EventEmitter<string> = new EventEmitter<string>(); 

  ngOnChanges(): void {
    this.cropWidth = this.rating * (75 / 5);
  }

  onClick():void{
      this.clickSurLesEtoiles.emit(`The rating ${this.rating} was clicked`);
  }
}


