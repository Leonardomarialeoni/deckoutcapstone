import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { CollezioneComponent } from './collezione/collezione.component';
import { DeckbuilderComponent } from './deckbuilder/deckbuilder.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [  { path: '', component: HomeComponent },
    { path: 'profilo', component: ProfiloComponent },
    { path: 'collezione', component: CollezioneComponent },
    { path: 'deckbuilder', component: DeckbuilderComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
  ];

