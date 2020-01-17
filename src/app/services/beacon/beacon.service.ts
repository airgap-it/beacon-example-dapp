import { Injectable } from '@angular/core'
import { DAppClient } from '@airgap/beacon-sdk/dist/client/clients/DappClient'
import { TransportType } from '@airgap/beacon-sdk/dist/client/transports/Transport'
import { ReplaySubject } from 'rxjs'
import { StorageService, SettingsKey } from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  public client: DAppClient = new DAppClient('Beacon Example Dapp')
  public connectionStatus: ReplaySubject<string> = new ReplaySubject(1)
  public activeAccount: ReplaySubject<string> = new ReplaySubject(1)

  constructor(private readonly storageService: StorageService) {
    this.initConnection()
    this.loadActiveAccount()
  }

  public async initConnection() {
    const result = await this.client.init()
    if (result === TransportType.POST_MESSAGE) {
      this.connectionStatus.next('Chrome Extension')
    } else if (result === TransportType.P2P) {
      this.connectionStatus.next('Beacon Connect')
    } else {
      this.connectionStatus.next('Not connected')
    }
  }

  public async loadActiveAccount() {
    const activeAccount = await this.storageService.get(SettingsKey.ACTIVE_ACCOUNT)
    if (activeAccount) {
      this.activeAccount.next(activeAccount)
    }
  }

  public async setActiveAccount(activeAccount: string) {
    this.activeAccount.next(activeAccount)
    this.persistActiveAccount(activeAccount)
  }

  public async persistActiveAccount(activeAccount: string) {
    this.storageService.set(SettingsKey.ACTIVE_ACCOUNT, activeAccount)
  }
}
