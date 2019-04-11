import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private heroService: HeroService) {
  }

  clearSelection(event) {
    this.hero = null;
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(event): void {
    this.location.back();
  }

  save(event) {
    console.log('save hero');
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack(event));
  }
}
