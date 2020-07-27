import { Component, OnInit } from '@angular/core';
import { FA } from '../_utils/icons';

declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  icons = FA.icons;
  ngOnInit(): void {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      dots: true,
      autoplay:true,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        768:  {
          items: 3
        }
      }
    });
  }

}
