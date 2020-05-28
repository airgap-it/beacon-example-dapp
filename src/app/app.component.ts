import { AccountInfo, SDK_VERSION } from '@airgap/beacon-sdk'
import { Component, ViewChild } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Observable } from 'rxjs'

import { HomePage } from './pages/home/home.page'
import { BeaconService } from './services/beacon/beacon.service'
import { ScrollService } from './services/scroll/scroll.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(HomePage, { read: HomePage }) public myContent!: HomePage

  public selectedTab: string = 'approach'
  public connectionStatus$: Observable<string>
  public activeAccount$: Observable<AccountInfo>
  public beaconSdkVersion: string = SDK_VERSION

  constructor(
    private readonly beaconService: BeaconService,
    private readonly scrollService: ScrollService,
    private readonly storage: Storage
  ) {
    this.connectionStatus$ = this.beaconService.connectionStatus$
    this.activeAccount$ = this.beaconService.activeAccount$
    this.scrollService.currentSelectedTab$.subscribe((currentTab: string) => {
      this.selectedTab = currentTab
    })
  }

  public scrollTo(element: string): void {
    this.scrollService.scrollTo(element)
  }

  public select(element: string): void {
    this.selectedTab = element
    this.scrollService.setCurrentSelectedTab(element)
  }

  public async reset(): Promise<void> {
    await this.beaconService.client.removeAllPeers()
    await this.storage.clear()
    location.reload()
  }
}
