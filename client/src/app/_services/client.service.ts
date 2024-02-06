import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Client } from '../_models/client';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends EntityService<Client> {
  constructor(http: HttpClient, userService: UserService) {
    super(http, userService);
    this.fetchUrl = 'client/GetClients/';
  }
}
