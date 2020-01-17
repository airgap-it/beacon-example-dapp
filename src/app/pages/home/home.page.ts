import { ScrollService } from './../../services/scroll/scroll.service'
import { Component } from '@angular/core'
import { AlertController, IonContent } from '@ionic/angular'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { PermissionResponse } from '@airgap/beacon-sdk/dist/client/Messages'
import { Storage } from '@ionic/storage'
import { TezosOperationType } from '@airgap/beacon-sdk/dist/client/operations/OperationTypes'
import { BeaconService } from 'src/app/services/beacon/beacon.service'
import { ActivatedRoute } from '@angular/router'
import { ViewChild } from '@angular/core'
// import { distinctUntilChanged, switchMap } from 'rxjs/operators'
import { throttleTime, switchMap } from 'rxjs/operators'
import { asyncScheduler } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild(IonContent, { read: IonContent }) myContent!: IonContent

  public addresses: PermissionResponse[] = []
  public contractAddress: string = 'KT1LH2o12xVRwTpJMZ6QJG74Fox8gE9QieFd'
  public contractBalance: string = ''
  public address: string = ''

  public unsignedTransaction: string = ''
  public broadcastTransaction: string = ''

  public transferAmount: string = ''
  public transferRecipient: string = ''

  public protocol = new TezosFAProtocol({
    symbol: 'TZBTC',
    name: 'Tezos BTC',
    marketSymbol: 'btc',
    identifier: 'xtz-btc',
    contractAddress: this.contractAddress,
    jsonRPCAPI: 'https://tezos-babylonnet-node-1.kubernetes.papers.tech',
    baseApiUrl: 'https://tezos-babylonnet-conseil-1.kubernetes.papers.tech',
    baseApiKey: 'airgap00391',
    baseApiNetwork: 'babylonnet'
  })

  constructor(
    private readonly alertController: AlertController,
    private readonly storage: Storage,
    private readonly beaconService: BeaconService,
    private route: ActivatedRoute,
    private scrollService: ScrollService
  ) {
    this.storage.get('addresses').then(res => {
      if (res) {
        this.addresses = res
        this.protocol
          .getAddressFromPublicKey(this.addresses[0].permissions.pubkey)
          .then(address => (this.address = address))
      }
    })
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f)
      if (element) element.scrollIntoView()
    })
    this.scrollService.scroll$.subscribe((element: string) => {
      this.scrollTo(element)
    })
  }

  public async askForPermissions() {
    this.beaconService.client
      .requestPermissions()
      .then(async response => {
        this.permissionGrantedAlert(response)
      })
      .catch(err => {
        console.log('PERMISSION ERROR', err)
      })
  }

  public ionViewDidEnter() {
    let htmlElement
    const firstElement = document.getElementById(this.scrollService.getFirstTab())
    this.scrollService.currentSelectedTab$
      .pipe(
        switchMap((currentTab: string) => {
          htmlElement = document.getElementById(currentTab)
          return this.myContent.ionScroll.pipe(throttleTime(100, asyncScheduler, { leading: true, trailing: true }))
        })
      )
      .subscribe(scrollDetailEvent => {
        if (scrollDetailEvent.detail.velocityY > 0) {
          // scrolling down
          if (htmlElement && htmlElement.offsetTop && scrollDetailEvent.detail.scrollTop > htmlElement.offsetTop) {
            this.scrollService.selectNewTab('next')
          }
        } else if (scrollDetailEvent.detail.velocityY < 0) {
          // scrolling up
          if (
            firstElement &&
            scrollDetailEvent.detail.scrollTop > firstElement.offsetTop &&
            htmlElement &&
            htmlElement.offsetTop &&
            scrollDetailEvent.detail.scrollTop < htmlElement.offsetTop - 1
          ) {
            this.scrollService.selectNewTab('previous')
          }
        }
      })
  }

  public async permissionGrantedAlert(response: PermissionResponse) {
    console.log('PERMISSION RESULT', response)
    const alert = await this.alertController.create({
      header: 'Permissions granted!',
      message: 'The wallet has granded you permissions to use the address',
      buttons: ['OK']
    })

    this.addresses = [response]
    this.storage.set('addresses', [response])
    this.address = await this.protocol.getAddressFromPublicKey(this.addresses[0].permissions.pubkey)
    this.beaconService.setActiveAccount(this.address)
    await alert.present()
  }

  public async getBalanceOfContract() {
    this.protocol.getBalance(this.address).then(balance => {
      this.contractBalance = balance
      console.log('tzbtc balance', balance)
    })
  }

  public async delegate() {
    this.beaconService.client
      .requestOperation({ network: 'mainnet', operationDetails: { kind: TezosOperationType.DELEGATION } })
      .then(async response => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'delegate',
          message: 'Done!',
          buttons: ['OK']
        })

        await alert.present()
      })
      .catch(err => {
        console.log('DELEGATE ERROR', err)
      })
  }

  public async operationRequest() {
    this.beaconService.client
      .requestOperation({ network: 'mainnet', operationDetails: { kind: TezosOperationType.DELEGATION } })
      .then(async response => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'operationRequest',
          message: 'Done!',
          buttons: ['OK']
        })

        await alert.present()
      })
      .catch(err => {
        console.log('OPERATION ERROR', err)
      })
  }

  public async sign() {
    this.beaconService.client
      .signPayloads({ payload: [Buffer.from('')], sourceAddress: '' })
      .then(async response => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'sign',
          message: 'Done!',
          buttons: ['OK']
        })

        await alert.present()
      })
      .catch(err => {
        console.log('SIGN ERROR', err)
      })
  }

  public async broadcast() {
    this.beaconService.client
      .requestBroadcast({ network: 'mainnet', signedTransaction: [Buffer.from(this.broadcastTransaction)] })
      .then(async response => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'broadcast',
          message: 'Done!',
          buttons: ['OK']
        })

        await alert.present()
      })
      .catch(err => {
        console.log('BROADCAST ERROR', err)
      })
  }

  scrollTo(element: string) {
    if (document.getElementById(element) != null) {
      const yOffset = document.getElementById(element)
      if (yOffset && yOffset.offsetTop) {
        this.myContent.scrollToPoint(0, yOffset.offsetTop, 500)
      }
    }
  }
}
