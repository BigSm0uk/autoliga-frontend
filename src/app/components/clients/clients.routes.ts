import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from '../client/client.component';
import { CreateOrEditClientComponent } from '../create-or-edit-client/create-or-edit-client.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: ':id',
    component: ClientComponent,
  },
  {
    path: ':id/create',
    component: CreateOrEditClientComponent,
  },
  {
    path: ':id/edit',
    component: CreateOrEditClientComponent,
  },
];
