import { Routes } from '@angular/router';
import { Login } from '../page/login/login';
import { Register } from '../page/register/register';
import { MainPageGuest } from '../page/main-page-guest/main-page-guest';

export const routes: Routes =[
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {path: 'mainpageguest', component:MainPageGuest},
    { path: "**", pathMatch: "full", redirectTo: "" }
]