import { ScrollService } from './services/scroll/scroll.service'
import { HomePage } from './pages/home/home.page'
import { Component, ViewChild } from '@angular/core'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { BeaconService } from './services/beacon/beacon.service'
import { Observable } from 'rxjs'
import { StorageService, SettingsKey } from './services/storage/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(HomePage, { read: HomePage }) myContent!: HomePage

  public selectedTab: string = 'approach'
  public connectionStatus: Observable<string>
  public activeAccount: Observable<string>

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ]

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly beaconService: BeaconService,
    private readonly scrollService: ScrollService,
    private readonly storageService: StorageService
  ) {
    this.initializeApp()
    this.connectionStatus = this.beaconService.connectionStatus.asObservable()
    this.activeAccount = this.beaconService.activeAccount.asObservable()
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
    await this.storageService.delete(SettingsKey.ACTIVE_ACCOUNT)
    location.reload()
  }
}
