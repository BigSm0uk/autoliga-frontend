import { Component, OnInit, inject } from '@angular/core';
import { ClientService, IClient } from '../../services/client.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  clients?: IClient[];
  clientService = inject(ClientService); // получаем сервис

  ngOnInit(): void {
    this.clientService.clients$.pipe().subscribe((clients) => {
      this.clients = clients;
    });
  }
}
