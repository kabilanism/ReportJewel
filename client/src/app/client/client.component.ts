import { Component, OnInit } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client';
import { take } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client: Client | undefined;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.selectedEntity$.pipe(take(1)).subscribe({
      next: (client: Client | null) => {
        if (client) {
          this.client = client;
        }
      },
    });
  }
}
