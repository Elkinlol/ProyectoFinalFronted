import { Routes } from '@angular/router';
import { Login } from '../page/login/login';
import { Register } from '../page/register/register';
import { Profile } from '../page/profile/profile';
import { ProfileHost } from '../page/profile-host/profile-host';
import { InsertCode } from '../page/insert-code/insert-code';
import { CreateListing } from '../page/create-listing/create-listing';
import { RecoverPassword } from '../page/recover-password/recover-password';
import { ChangePassword } from '../page/change-password/change-password';
import { Reserve } from '../components/reserve/reserve';
import { MyPlaces } from '../components/my-places/my-places';
import { PlaceDetail } from '../components/detail-listing/detail-listing';
import { EditListing } from '../page/edit-listing/edit-listing';
import { Home } from '../page/home/home';
import { Search } from '../components/search/search';
import { MyReservs } from '../page/my-reservs/my-reservs';
import { MyListingsReserves } from '../page/my-listings-reserves/my-listings-reserves';
import { roleGuard } from './role-guard';
import { CreatePromotion } from '../page/create-promotion/create-promotion';

export const routes: Routes = [
  {path:'login', component: Login },
  {path:'register', component: Register},
  {path:'profile', component: Profile,canActivate: [roleGuard], data: { expectedRole: ["GUEST"]}},
  {path:'profile-host', component: ProfileHost ,canActivate: [roleGuard], data: { expectedRole: ["HOST"]}},
  {path:'insert-code', component: InsertCode},
  {path:'create-listing', component: CreateListing, canActivate: [roleGuard], data: { expectedRole: ["HOST"]} },
  {path:'recover-password', component: RecoverPassword},
  {path:'change-password', component: ChangePassword},
  {path:'reserve', component: Reserve,canActivate: [roleGuard], data: { expectedRole: ["GUEST"]}},
  {path:"my-places", component: MyPlaces ,canActivate: [roleGuard], data: { expectedRole: ["HOST"]}},
  {path:'listing/:id', component: MyPlaces,canActivate: [roleGuard], data: { expectedRole: ["HOST"]}},
  {path:'detail-listing/:id', component: PlaceDetail},
  {path: 'edit-listing/:id', component: EditListing,canActivate: [roleGuard], data: { expectedRole: ["HOST"]}},
  {path: 'home', component: Home},
  {path:'search', component: Search},
  {path: 'my-reservs', component: MyReservs ,canActivate: [roleGuard], data: { expectedRole: ["GUEST"]}},
  {path: 'my-listing-reserves/:id', component: MyListingsReserves,canActivate: [roleGuard], data: { expectedRole: ["HOST"]}},
  {path: 'create-promotion/:id', component: CreatePromotion},
  { path: "**", pathMatch: "full", redirectTo: "home" }
];