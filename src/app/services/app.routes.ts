import { Routes } from '@angular/router';
import { Login } from '../page/login/login';
import { Register } from '../page/register/register';
import { MainPageGuest } from '../page/main-page-guest/main-page-guest';
import { Profile } from '../page/profile/profile';
import { ProfileHost } from '../page/profile-host/profile-host';
import { InsertCode } from '../page/insert-code/insert-code';
import { CreateListing } from '../page/create-listing/create-listing';
import { RecoverPassword } from '../page/recover-password/recover-password';
import { ChangePassword } from '../page/change-password/change-password';
import { Reserve } from '../page/reserve/reserve';

export const routes: Routes = [
  { path: '', component: MainPageGuest },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: 'main-page-guest', component: MainPageGuest},
  {path: 'profile', component: Profile},
  {path: 'profile-host', component: ProfileHost},
  {path: 'insert-code', component: InsertCode},
  {path: 'create-listing', component: CreateListing},
  {path: 'recover-password', component: RecoverPassword},
  {path: 'change-password', component: ChangePassword},
  {path: 'reserve', component: Reserve},
  { path: "**", pathMatch: "full", redirectTo: "" }
];