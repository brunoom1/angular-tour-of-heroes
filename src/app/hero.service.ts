import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Hero from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

type HandleErrorReturn<T> = (error: any) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetche hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`add new hero ${newHero.name}`)),
        catchError(this.handleError<Hero>('add new hero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((h: Hero[]) => this.log(`search items by term ${ term }`)),
        catchError(this.handleError<Hero[]>('erro in filter users'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap<Hero>(_ => this.log(`remove hero ${id}`)),
        catchError(this.handleError<Hero>(`error remove hero`))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('updateHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): HandleErrorReturn<T> {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
