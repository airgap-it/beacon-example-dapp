import {
  AccountInfo,
  BroadcastResponseOutput,
  OperationResponseOutput,
  PermissionResponseOutput,
  SignPayloadResponseOutput,
  TezosOperationType
} from '@airgap/beacon-sdk'
import { getAddressFromPublicKey } from '@airgap/beacon-sdk/dist/utils/crypto'
import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlertController, IonContent } from '@ionic/angular'
import { TezosProtocol } from 'airgap-coin-lib'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { asyncScheduler, Observable } from 'rxjs'
import { first, switchMap, throttleTime } from 'rxjs/operators'
import { BeaconService } from 'src/app/services/beacon/beacon.service'

import { ScrollService } from './../../services/scroll/scroll.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild(IonContent, { read: IonContent }) public myContent!: IonContent

  public contractAddress: string = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn'
  public contractBalance: string = ''
  public activeAccount$: Observable<AccountInfo>
  public activeAccount: AccountInfo | undefined

  public selectedNetwork: string = 'mainnet'
  public networkName: string | undefined
  public networkRpcUrl: string | undefined

  public delegationAddress: string = 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ'

  public tippingAmount: string = '1'

  public rawOperationRequest: string = `[
    {
      "kind": "transaction",
      "amount": "1234567",
      "destination": "tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ"
    }
  ]`

  public unsignedTransaction: string =
    'f8f9b125f7ef6bbae5ee27f4612220ac93aa7c392ac5f548d15e18c2bd9a7d926c00075da6a7c0ec09c550623fefd8a9cdf40d3d9910ad8100e1dc5fbc500001000012548f71994cb2ce18072d0dcb568fe35fb7493000'
  public broadcastTransaction: string =
    '1ef017b560494ae7b102be63f4d64e64d70114ff4652df23f34ae4460645b3266b00641b67c32672f0b11263b89b05b51e42faa64a3f940ad8d79101904e0000c64ac48e550c2c289af4c5ce5fe52ca7ba7a91d1a411745313e154eff8d118f16c00641b67c32672f0b11263b89b05b51e42faa64a3fdc0bd9d79101bc5000000000641b67c32672f0b11263b89b05b51e42faa64a3f0085dcfbba4a00c5b4f89914c1819ccd8466f6328b74073d50406394e59fe32d89e62112fec2d5a9bc1e6787206fe50e26f90999ae3061ca76247b57e08b6e490a'

  public transferAmount: string = ''
  public transferRecipient: string = ''

  public connectedAccounts: AccountInfo[] = []

  public protocol: TezosFAProtocol = new TezosFAProtocol({
    symbol: 'TZBTC',
    name: 'Tezos BTC',
    marketSymbol: 'btc',
    identifier: 'xtz-btc',
    contractAddress: this.contractAddress,
    jsonRPCAPI: 'https://tezos-node.prod.gke.papers.tech',
    baseApiUrl: 'https://tezos-mainnet-conseil-1.kubernetes.papers.tech',
    baseApiKey: 'airgap00391',
    baseApiNetwork: 'mainnet'
  })

  constructor(
    private readonly alertController: AlertController,
    private readonly beaconService: BeaconService,
    private readonly route: ActivatedRoute,
    private readonly scrollService: ScrollService
  ) {
    this.activeAccount$ = this.beaconService.activeAccount$
    this.activeAccount$.subscribe((activeAccount: AccountInfo) => {
      this.activeAccount = activeAccount
    })

    this.route.fragment.subscribe((f: string) => {
      const element: Element | null = document.querySelector(`#${f}`)
      if (element) {
        element.scrollIntoView()
      }
    })
    this.scrollService.scroll$.subscribe((element: string) => {
      this.scrollTo(element).catch(console.error)
    })
  }

  public async askForPermissions(): Promise<void> {
    this.beaconService.client
      .requestPermissions({
        network: {
          type: this.selectedNetwork as any,
          name: this.networkName,
          rpcUrl: this.networkRpcUrl
        }
      })
      .then(async (response: PermissionResponseOutput) => {
        return this.permissionGrantedAlert(response)
      })
      .catch((err) => {
        console.error('PERMISSION ERROR', err)
      })
  }

  public async showConnectedAccounts(): Promise<void> {
    this.connectedAccounts = await this.beaconService.client.getAccounts()
  }

  public async activateAccount(accountInfo: AccountInfo): Promise<void> {
    await (this.beaconService.client as any).setActiveAccount(accountInfo)
  }

  public async disconnectAccount(accountIdentifier: string): Promise<void> {
    await this.beaconService.client.removeAccount(accountIdentifier)
    await this.showConnectedAccounts()
  }

  public async ionViewDidEnter(): Promise<void> {
    let htmlElement: HTMLElement | null
    const firstElement: HTMLElement | null = document.getElementById(this.scrollService.getFirstTab())
    this.scrollService.currentSelectedTab$
      .pipe(
        switchMap((currentTab: string) => {
          htmlElement = document.getElementById(currentTab)

          return this.myContent.ionScroll.pipe(throttleTime(100, asyncScheduler, { leading: true, trailing: true }))
        })
      )
      .subscribe((scrollDetailEvent: CustomEvent) => {
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

  public async permissionGrantedAlert(response: PermissionResponseOutput): Promise<void> {
    console.log('PERMISSION RESULT', response)
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: 'Permissions granted!',
      message: `The wallet has granded you permissions to use the address ${response.address}`,
      buttons: ['OK']
    })

    await alert.present()
  }

  public async getBalanceOfContract(): Promise<void> {
    if (this.activeAccount && this.activeAccount.address) {
      this.protocol
        .getBalance(this.activeAccount.address)
        .then((balance: string) => {
          this.contractBalance = balance
          console.log('tzbtc balance', balance)
        })
        .catch(console.error)
    } else {
      this.contractBalance = '0'
    }
  }

  public async tip(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }
    this.beaconService.client
      .requestOperation({
        network: this.activeAccount.network,
        operationDetails: [
          {
            kind: TezosOperationType.TRANSACTION,
            amount: (parseInt(this.tippingAmount, 10) * 1000000).toString(),
            destination: 'tz1MJx9vhaNRSimcuXPK2rW4fLccQnDAnVKJ'
          } as any
        ]
      })
      .then(async (response: OperationResponseOutput) => {
        console.log(response)
        const alert: HTMLIonAlertElement = await this.alertController.create({
          header: 'Operation Successful',
          message: 'Thanks for your tip!',
          buttons: [
            {
              text: 'Open Blockexplorer',
              handler: (): void => {
                window.open(new TezosProtocol().getBlockExplorerLinkForTxId(response.transactionHash), '_blank')
              }
            },
            'OK'
          ]
        })

        await alert.present()
      })
      .catch(async (err) => {
        const alert: HTMLIonAlertElement = await this.alertController.create({
          header: 'Broadcast failed!',
          message: 'The message could not be broadcast. Please check if you have enough balance.',
          buttons: ['OK']
        })

        await alert.present()
        console.log('TIP ERROR', err)
      })
  }

  public async delegate(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }
    this.beaconService.client
      .requestOperation({
        network: this.activeAccount.network,
        operationDetails: [{ kind: TezosOperationType.DELEGATION, delegate: this.delegationAddress } as any]
      })
      .then(async (response: OperationResponseOutput) => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'Operation Successful',
          message: 'Thanks for your delegation!',
          buttons: [
            {
              text: 'Open Blockexplorer',
              handler: (): void => {
                window.open(new TezosProtocol().getBlockExplorerLinkForTxId(response.transactionHash), '_blank')
              }
            },
            'OK'
          ]
        })

        await alert.present()
      })
      .catch(async (err) => {
        const alert: HTMLIonAlertElement = await this.alertController.create({
          header: 'Broadcast failed!',
          message: 'The message could not be broadcast. Please check if you have enough balance.',
          buttons: ['OK']
        })

        await alert.present()
        console.log('DELEGATE ERROR', err)
      })
  }

  public async transfer(): Promise<void> {
    this.activeAccount$.pipe(first()).subscribe((accountInfo: AccountInfo) => {
      this.beaconService.client
        .requestOperation({
          network: accountInfo.network,
          operationDetails: [
            {
              kind: TezosOperationType.TRANSACTION,
              amount: this.transferAmount,
              destination: this.transferRecipient
            }
          ]
        })
        .then(async (response: OperationResponseOutput) => {
          console.log(response)
          const alert = await this.alertController.create({
            header: 'Operation Successful',
            message: 'The operation has been broadcast to the network.',
            buttons: [
              {
                text: 'Open Blockexplorer',
                handler: (): void => {
                  window.open(new TezosProtocol().getBlockExplorerLinkForTxId(response.transactionHash), '_blank')
                }
              },
              'OK'
            ]
          })

          await alert.present()
        })
        .catch(async (err) => {
          const alert = await this.alertController.create({
            header: 'Broadcast failed!',
            message: 'The message could not be broadcast. Please check if you have enough balance.',
            buttons: ['OK']
          })

          await alert.present()
          console.log('OPERATION ERROR', err)
        })
    })
  }

  public async operationRequest(): Promise<void> {
    this.activeAccount$.pipe(first()).subscribe((accountInfo: AccountInfo) => {
      this.beaconService.client
        .requestOperation({
          network: accountInfo.network,
          operationDetails: JSON.parse(this.rawOperationRequest)
        })
        .then(async (response: OperationResponseOutput) => {
          console.log(response)
          const alert = await this.alertController.create({
            header: 'Operation Successful',
            message: 'The operation has been broadcast to the network.',
            buttons: [
              {
                text: 'Open Blockexplorer',
                handler: (): void => {
                  window.open(new TezosProtocol().getBlockExplorerLinkForTxId(response.transactionHash), '_blank')
                }
              },
              'OK'
            ]
          })

          await alert.present()
        })
        .catch(async (err) => {
          const alert = await this.alertController.create({
            header: 'Broadcast failed!',
            message: 'The message could not be broadcast. Please check if you have enough balance.',
            buttons: ['OK']
          })

          await alert.present()
          console.log('OPERATION ERROR', err)
        })
    })
  }

  public async sign(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }
    this.beaconService.client
      .requestSignPayload({
        payload: this.unsignedTransaction,
        sourceAddress: this.activeAccount.pubkey
          ? await new getAddressFromPublicKey(this.activeAccount.pubkey)
          : undefined
      })
      .then(async (response: SignPayloadResponseOutput) => {
        console.log(response)
        const alert = await this.alertController.create({
          header: 'Signing Successful',
          message: `The signature for your message is: ${response.signature}`,
          buttons: ['OK']
        })

        await alert.present()
      })
      .catch((err) => {
        console.log('SIGN ERROR', err)
      })
  }

  public async broadcast(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }

    this.beaconService.client
      .requestBroadcast({
        network: this.activeAccount.network,
        signedTransaction: this.broadcastTransaction
      })
      .then(async (response: BroadcastResponseOutput) => {
        console.log(response)
        const alert: HTMLIonAlertElement = await this.alertController.create({
          header: 'Broadcast Successful',
          message: 'Your operation has been broadcast to the network.',
          buttons: [
            {
              text: 'Open Blockexplorer',
              handler: (): void => {
                window.open(new TezosProtocol().getBlockExplorerLinkForTxId(response.transactionHash), '_blank')
              }
            },
            'OK'
          ]
        })

        await alert.present()
      })
      .catch((err) => {
        console.log('BROADCAST ERROR', err)
      })
  }

  public async scrollTo(element: string): Promise<void> {
    if (document.getElementById(element) != null) {
      const yOffset: HTMLElement | null = document.getElementById(element)
      if (yOffset && yOffset.offsetTop) {
        await this.myContent.scrollToPoint(0, yOffset.offsetTop, 500)
      }
    }
  }
}
