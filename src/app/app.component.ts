import { ScrollService } from './services/scroll/scroll.service'
import { HomePage } from './pages/home/home.page'
import { Component, ViewChild } from '@angular/core'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { BeaconService } from './services/beacon/beacon.service'
import { Observable } from 'rxjs'
import { Storage } from '@ionic/storage'
import { AccountInfo } from '@airgap/beacon-sdk/dist/clients/Client'
import { switchMap } from 'rxjs/operators'
import { TezosProtocol } from 'airgap-coin-lib'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(HomePage, { read: HomePage }) myContent!: HomePage

  public selectedTab: string = 'approach'
  public connectionStatus: Observable<string>
  public activeAccount: Observable<AccountInfo>
  public activeAddress: Observable<string>

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly beaconService: BeaconService,
    private readonly scrollService: ScrollService,
    private readonly storage: Storage
  ) {
    this.initializeApp()
    this.connectionStatus = this.beaconService.connectionStatus.asObservable()
    this.activeAccount = this.beaconService.activeAccount.asObservable()
    this.activeAddress = this.activeAccount.pipe(
      switchMap(accountInfo => new TezosProtocol().getAddressFromPublicKey(accountInfo.pubkey))
    )
    this.scrollService.currentSelectedTab$.subscribe(currentTab => {
      this.selectedTab = currentTab
    })
  }

  initializeApp() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault()
        this.splashScreen.hide()
      })
    }
  }

  public scrollTo(element: string) {
    this.scrollService.scrollTo(element)
  }

  public select(element: string) {
    this.selectedTab = element
    this.scrollService.setCurrentSelectedTab(element)
  }

  public async reset() {
    await this.beaconService.client.removeAllPeers()
    await this.storage.clear()
    location.reload()
  }
}
