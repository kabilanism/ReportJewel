import { Component, OnInit } from '@angular/core';
import { Client } from '../_models/client';
import { ClientService } from '../_services/client.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.entities$.pipe(take(1)).subscribe({
      next: (clients: Client[]) => {
        console.log(clients);
        this.clients = clients;
      },
    });

    this.clientService.fetchEntityData();
  }
}
