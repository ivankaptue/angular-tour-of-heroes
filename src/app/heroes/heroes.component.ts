import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  clearSelection() {
    this.selectedHero = null;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: string): void {
    if (!name) {
      return;
    }
    name = name.trim();
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.unshift(hero));
  }

  delete(hero: Hero) {
    console.log(`delete hero ${hero.id}`);
    const index: number = this.heroes.indexOf(hero);
    this.heroes.splice(index, 1);
    this.heroService.deleteHero(hero).subscribe();
  }
}
