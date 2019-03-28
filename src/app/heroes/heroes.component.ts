import { HEROES } from './../mock-heroes';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero
  heroes = HEROES

  onSelect(hero: Hero): void{
    this.selectedHero = hero
  }

  constructor() { }

  ngOnInit() {
  }

}