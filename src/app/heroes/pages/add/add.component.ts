import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';

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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
        .subscribe((hero) => (this.hero = hero));
    }
  }

  saveHero() {
    if (this.hero.superhero.trim().length > 0) {
      if (this.hero.id) {
        //actualizar
        this.heroesService.update(this.hero).subscribe((hero) => {
          this.showSnackBar('Heroe actualizado correctamente!');
        });
      } else {
        //crear
        this.heroesService.save(this.hero).subscribe((hero) => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar('Heroe creado correctamente!');
        });
      }
    }
  }

  deleteHero() {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { ...this.hero },
    });

    confirm
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.heroesService.delete(this.hero.id!);
          }

          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.router.navigate(['/heroes']);
        }
      });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Ok!', {
      duration: 2500,
    });
  }
}
