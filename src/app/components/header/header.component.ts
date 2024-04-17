import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ButtonModule]
})
export class HeaderComponent implements OnInit {
  constructor() { }

  @Input() title = "Header";
  @Output() back = new EventEmitter();

  ngOnInit() {
  }

}
