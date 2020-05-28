import { AccountInfo, BeaconEvent, DAppClient, Transport, TransportType } from '@airgap/beacon-sdk'
import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  public client: DAppClient = new DAppClient({
    name: 'Beacon Example Dapp'
  })

  private readonly _connectionStatus$: ReplaySubject<string> = new ReplaySubject(1)
  public get connectionStatus$(): Observable<string> {
    return this._connectionStatus$.pipe(distinctUntilChanged())
  }

  private readonly _activeAccount$: ReplaySubject<AccountInfo> = new ReplaySubject(1)
  public get activeAccount$(): Observable<AccountInfo> {
    return this._activeAccount$.pipe(distinctUntilChanged())
  }

  public balance: Observable<string> = new ReplaySubject(1)

  constructor() {
    this.client
      .subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, async (data: AccountInfo) => {
        this._activeAccount$.next(data)
      })
      .catch(console.error)

    this.client
      .subscribeToEvent(BeaconEvent.ACTIVE_TRANSPORT_SET, async (data: Transport) => {
        if (data.type === TransportType.POST_MESSAGE) {
          this._connectionStatus$.next('Chrome Extension')
        } else if (data.type === TransportType.P2P) {
          this._connectionStatus$.next('Beacon Connect')
        } else {
          this._connectionStatus$.next('Not connected')
        }
      })
      .catch(console.error)

    this.initConnection().catch(console.error)
  }

  public async initConnection(): Promise<void> {
    await this.client.init()
  }
}
