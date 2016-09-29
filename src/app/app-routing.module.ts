import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'board', component: BoardDetailComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class SoundboardRoutingModule { }
