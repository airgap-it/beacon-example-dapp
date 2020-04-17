import { AccountInfo, DAppClient, TransportType } from '@airgap/beacon-sdk'
import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'

import { SettingsKey, StorageService } from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  public client: DAppClient = new DAppClient('Beacon Example Dapp')
  public connectionStatus: ReplaySubject<string> = new ReplaySubject(1)
  public activeAccount: ReplaySubject<AccountInfo> = new ReplaySubject(1)

  public accountInfo: Observable<AccountInfo> = new ReplaySubject(1)
  public balance: Observable<string> = new ReplaySubject(1)

  constructor(private readonly storageService: StorageService) {
    this.accountInfo = this.activeAccount.pipe(
      mergeMap(async activeAccount => this.client.getAccount(activeAccount.accountIdentifier)),
      filter(accountInfo => accountInfo !== undefined)
    ) as Observable<AccountInfo> // TODO: Fix typings

    // TODO: Remove this once we use accountInfo. If this is deleted, the pipe above is not executed.
    this.accountInfo.subscribe(accountInfo => console.log('accountInfo', accountInfo))

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

  public async setActiveAccount(activeAccount: AccountInfo) {
    if (activeAccount) {
      this.activeAccount.next(activeAccount)
      this.persistActiveAccount(activeAccount)
    }
  }

  public async persistActiveAccount(activeAccount: AccountInfo) {
    this.storageService.set(SettingsKey.ACTIVE_ACCOUNT, activeAccount)
  }
}
