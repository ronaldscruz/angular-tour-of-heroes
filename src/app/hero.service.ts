import { MessageService } from './message.service';
import { Observable, of } from 'rxjs'

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor( private messageService: MessageService ) { }

  getHeroes(): Observable<Hero[]>{
    this.messageService.add("HeroService: fetched heroes")
    return of(HEROES)
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched Hero id: ${id}`)
    return of(HEROES.find(hero => hero.id === id))
  }
}
