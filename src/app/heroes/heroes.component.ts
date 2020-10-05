import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import Hero from './../hero';
import {HeroService} from './../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  selectedHero: Hero;

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe((hero) => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    const id = typeof hero === 'number' ? hero : hero.id;

    this.heroes = this.heroes.filter(h => h.id !== id);
    this.heroService.deleteHero(hero).subscribe();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero ${hero.id}`);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(private heroService: HeroService, private messageService: MessageService ) { }

}
