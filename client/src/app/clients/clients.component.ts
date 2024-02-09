import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../_models/client';
import { ClientService } from '../_services/client.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  clientsSubscription: Subscription = new Subscription();

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientsSubscription = this.clientService.fetchEntityData().subscribe({
      next: (clients: Client[] | null) => {
        if (clients) {
          this.clients = clients;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.clientsSubscription?.unsubscribe();
  }
}
