import { Injectable } from '@angular/core'
import { DAppClient } from '@airgap/beacon-sdk/dist/client/clients/DappClient'
import { TransportType } from '@airgap/beacon-sdk/dist/client/transports/Transport'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  public client: DAppClient = new DAppClient('Beacon Example Dapp')
  public connectionStatus: ReplaySubject<string> = new ReplaySubject(1)

  constructor() {
    this.initConnection()
  }

  public async initConnection() {
    const result = await this.client.init()
    console.log(result)
    if (result === TransportType.POST_MESSAGE) {
      this.connectionStatus.next('Chrome Extension')
    } else if (result === TransportType.P2P) {
      this.connectionStatus.next('Beacon Connect')
    } else {
      this.connectionStatus.next('Not connected')
    }
  }
}
