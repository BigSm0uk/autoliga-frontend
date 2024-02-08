import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
  Event as NavigationEvent,
  NavigationStart,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.setMenuActive(
          this.menuValues.findIndex(
            (x) => x.path === this.getRootPath(event.url)
          )
        );
      }
    });
  }
  public isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
  }
  public IsOpenMenu = false;
  public menuValues: IMenu[] = [
    { name: 'Клиенты', path: '/clients', active: false },
    { name: 'Заявки', path: '/proposal', active: false },
  ];
  public getRootPath(path: string): string {
    return '/' + path.split('/')[1];
  }
  public setMenuActive(i: number): void {
    this.clearMenuActive();
    if (i === -1) return;
    this.menuValues[i].active = true;
  }
  public clearMenuActive() {
    this.menuValues.forEach((element) => {
      element.active = false;
    });
  }
  public getAuthState(): boolean {
    return this.isAuthenticated;
  }
  public OpenCloseMenu(): void {
    this.IsOpenMenu = !this.IsOpenMenu;
  }
}

interface IMenu {
  name: string;
  path: string;
  active: boolean;
}
export const TOKEN_KEY = 'auth_token';
