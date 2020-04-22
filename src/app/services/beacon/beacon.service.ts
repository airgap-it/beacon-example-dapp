import { AccountInfo, DAppClient, TransportType } from '@airgap/beacon-sdk'
import { InternalEvent } from '@airgap/beacon-sdk/dist/events'
import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  public client: DAppClient = new DAppClient({ name: 'Beacon Example Dapp' })

  private readonly _connectionStatus$: ReplaySubject<string> = new ReplaySubject(1)
  public get connectionStatus$(): Observable<string> {
    return this._connectionStatus$.asObservable()
  }

  private readonly _activeAccount$: ReplaySubject<AccountInfo> = new ReplaySubject(1)
  public get activeAccount$(): Observable<AccountInfo> {
    return this._activeAccount$.asObservable()
  }

  public balance: Observable<string> = new ReplaySubject(1)

  constructor() {
    this.client
      .subscribeToEvent(InternalEvent.ACTIVE_ACCOUNT_SET, (data: unknown) => {
        this._activeAccount$.next(data as any)
      })
      .catch(console.error)
    this.initConnection().catch(console.error)
  }

  public async initConnection(): Promise<void> {
    const result: TransportType = await this.client.init()
    if (result === TransportType.POST_MESSAGE) {
      this._connectionStatus$.next('Chrome Extension')
    } else if (result === TransportType.P2P) {
      this._connectionStatus$.next('Beacon Connect')
    } else {
      this._connectionStatus$.next('Not connected')
    }
  }
}
