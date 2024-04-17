import { trigger, state, style, transition, animate } from "@angular/animations";

trigger('openClosePage', [
  // ...
  state('open', style({
    height: '200px',
    opacity: 1,
    translateY: '-100%'
  })),
  state('closed', style({
    height: '100px',
    opacity: 0.8,
    translateY: '-100%'
  })),
  transition(':enter', [
    animate('1s')
  ]),
  transition(':leave', [
    animate('0.5s')
  ]),
])