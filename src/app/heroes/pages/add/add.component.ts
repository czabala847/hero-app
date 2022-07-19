import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      description: 'DC  - Comics',
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  saveHero() {
    if (this.hero.superhero.trim().length > 0) {
      this.heroesService.save(this.hero).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
