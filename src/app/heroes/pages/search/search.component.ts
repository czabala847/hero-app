import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  heroes: Hero[] = [];
  heroSelected!: Hero;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  searching() {
    this.heroesService
      .getSuggestion(this.query)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;
    if (hero) {
      this.query = hero.superhero;

      if (hero.id) {
        this.heroesService
          .getHeroById(hero.id)
          .subscribe((hero) => (this.heroSelected = hero));
      }
    } else {
      this.query = '';
    }
  }
}
