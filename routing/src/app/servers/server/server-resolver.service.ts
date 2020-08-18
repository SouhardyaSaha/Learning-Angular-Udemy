import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ServersService } from '../servers.service'

interface Server {
  id: number
  name: string
  status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serverService: ServersService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serverService.getServer(+route.params['id'])
  }
}
