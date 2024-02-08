import { Routes } from '@angular/router';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { HelloComponent } from './components/hello/hello.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'hello' },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/clients/clients.routes').then(
        (r) => r.CLIENT_ROUTES
      ),
  },
  {
    path: 'proposal',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/proposal/proposal.routes').then(
        (r) => r.PROPOSAL_ROUTES
      ),
  },

  {
    path: 'hello',
    pathMatch: 'full',
    component: HelloComponent,
  },

  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: NotfoundpageComponent },
];
