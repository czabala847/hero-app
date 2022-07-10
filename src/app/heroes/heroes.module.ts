import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImageHeroPipe } from './pipes/image-hero.pipe';

@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    HeroComponent,
    HomeComponent,
    ListComponent,
    HeroCardComponent,
    ImageHeroPipe,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
})
export class HeroesModule {}
