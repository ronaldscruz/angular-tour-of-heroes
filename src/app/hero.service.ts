import { MessageService } from './message.service';
import { Observable, of } from 'rxjs'

import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = '/api/heroes'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor( 
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private log(msg: string){
    this.messageService.add(`HeroService: ${msg}`)
  }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero>{
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched Hero id: ${id}`)),
        catchError(this.handleError<Hero>('getHero id='+id), )
      )
  }

  updateHero(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero ${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`created hero ${hero.name}`)),
      catchError(this.handleError<any>('addHero'))
    )
  }
  
  deleteHero(hero: Hero): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id

    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero ${hero.name}`)),
      catchError(this.handleError<any>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim())
      return of([])

    return this.http.get<Hero>(`${this.heroesUrl}?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching term '${term}'`)),
      catchError(this.handleError<any>('searchHeroes', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
