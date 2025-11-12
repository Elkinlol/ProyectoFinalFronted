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
import { Reserve } from '../components/reserve/reserve';
import { MyPlaces } from '../components/my-places/my-places';
import { DetailPlace } from '../components/detail-listing/detail-listing';
import { Home } from '../page/home/home';

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
  { path: "my-places", component: MyPlaces },
  { path: 'listing/:id', component: DetailPlace },
  {path: 'home', component: Home},
  { path: "**", pathMatch: "full", redirectTo: "home" }
];