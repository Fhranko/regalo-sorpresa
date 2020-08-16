import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  imagenes: any[] = [{
    img: 'assets/img/billetera.png',
    nombre: 'billetera'
  },{
    img: 'assets/img/boligrafo.png',
    nombre: 'billetera'
  },{
    img: 'assets/img/friki.png',
    nombre: 'friki'
  },{
    img: 'assets/img/llavero.png',
    nombre: 'llavero'
  },{
    img: 'assets/img/mochila.png',
    nombre: 'mochila'
  }]

  constructor(private _config: NgbCarouselConfig) { 
    _config.interval = 3000;
    _config.pauseOnHover = false;
    _config.showNavigationIndicators = false;
    _config.showNavigationArrows = false;
  }

  ngOnInit(): void {
  }

}
