import { ScrollService } from './../../services/scroll/scroll.service'
import { Component } from '@angular/core'
import { AlertController, IonContent } from '@ionic/angular'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { PermissionResponse } from '@airgap/beacon-sdk/dist/messages/Messages'
import { Storage } from '@ionic/storage'
import { TezosOperationType } from '@airgap/beacon-sdk/dist/client/operations/OperationTypes'
import { BeaconService } from 'src/app/services/beacon/beacon.service'
import { ActivatedRoute } from '@angular/router'
import { ViewChild } from '@angular/core'
import { throttleTime, switchMap, take } from 'rxjs/operators'
import { asyncScheduler, Observable } from 'rxjs'

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
  public activeAddress: Observable<string> = this.beaconService.activeAccount.asObservable()

  public delegationAddress: string = 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ'
  
  public tippingAmount: string = '1'

  public rawOperationRequest: string = `[
    {
      "kind": "transaction",
      "amount": "1234567",
      "destination": "tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ"
    }
  ]`

  public unsignedTransaction: string = 'f8f9b125f7ef6bbae5ee27f4612220ac93aa7c392ac5f548d15e18c2bd9a7d926c00075da6a7c0ec09c550623fefd8a9cdf40d3d9910ad8100e1dc5fbc500001000012548f71994cb2ce18072d0dcb568fe35fb7493000'
  public broadcastTransaction: string = '1ef017b560494ae7b102be63f4d64e64d70114ff4652df23f34ae4460645b3266b00641b67c32672f0b11263b89b05b51e42faa64a3f940ad8d79101904e0000c64ac48e550c2c289af4c5ce5fe52ca7ba7a91d1a411745313e154eff8d118f16c00641b67c32672f0b11263b89b05b51e42faa64a3fdc0bd9d79101bc5000000000641b67c32672f0b11263b89b05b51e42faa64a3f0085dcfbba4a00c5b4f89914c1819ccd8466f6328b74073d50406394e59fe32d89e62112fec2d5a9bc1e6787206fe50e26f90999ae3061ca76247b57e08b6e490a'

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
          .getAddressFromPublicKey(this.addresses[0].permissions.pubkey).then(address => {
            this.beaconService.setActiveAccount(address)
          })
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
    const address = await this.protocol.getAddressFromPublicKey(this.addresses[0].permissions.pubkey)
    this.beaconService.setActiveAccount(address)
    await alert.present()
  }

  public async getBalanceOfContract() {
    this.activeAddress.pipe(take(1)).subscribe(address => {
      this.protocol.getBalance(address).then(balance => {
        this.contractBalance = balance
        console.log('tzbtc balance', balance)
      })
    })
  }

  public async tip() {
    this.beaconService.client
      .requestOperation({ network: 'mainnet', operationDetails: [{ kind: TezosOperationType.TRANSACTION, amount: (parseInt(this.tippingAmount) * 1000000).toString(), destination: 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ' } as any] })
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

  public async delegate() {
    this.beaconService.client
      .requestOperation({ network: 'mainnet', operationDetails: [{ kind: TezosOperationType.DELEGATION, delegate: this.delegationAddress } as any] })
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
      .requestOperation({ network: 'mainnet', operationDetails: JSON.parse(this.rawOperationRequest) })
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
      .signPayloads({ payload: [this.unsignedTransaction as any], sourceAddress: '' })
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
      .requestBroadcast({ network: 'mainnet', signedTransactions: [this.broadcastTransaction as any] })
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
