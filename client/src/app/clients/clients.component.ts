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
  clientsSubscription: Subscription | undefined;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientsSubscription = this.clientService.entities$.subscribe({
      next: (clients: Client[]) => {
        console.log(clients);
        this.clients = clients;
      },
    });

    this.clientService.fetchEntityData();
  }

  ngOnDestroy(): void {
    this.clientsSubscription?.unsubscribe();
  }
}
