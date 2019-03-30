import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, debounce, distinct } from 'rxjs/operators' 
import { Hero } from '../hero'
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) { }

  ngOnInit() :void{
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystore before considering the term
      debounceTime(300),

      // ignore if the term is the same of previous
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

  search(term: string): void{
    this.searchTerms.next(term)
  }
}
