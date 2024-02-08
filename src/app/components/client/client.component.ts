import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ClientService, IClient } from '../../services/client.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  public client?: IClient;
  public clientService = inject(ClientService); // получаем сервис
  public clientId: string = '0';

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((params) => {
      this.clientId = params['id'];
    });
    this.client$ = this.clientService.clients$.subscribe((clients) => {
      this.client = clients.find((x) => x.id === this.clientId);
    });
  }
  ngOnDestroy(): void {
    this.route$?.unsubscribe;
    this.client$?.unsubscribe;
  }

  private route$?: Subscription;
  private client$?: Subscription;
}
