import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { BeaconService } from './services/beacon/beacon.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public connectionStatus: Observable<string>
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

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private readonly beaconService: BeaconService) {
    this.initializeApp()
    this.connectionStatus = this.beaconService.connectionStatus.asObservable()
  }

  initializeApp() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault()
        this.splashScreen.hide()
      })
    }
  }
}
