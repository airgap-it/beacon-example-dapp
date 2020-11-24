import { AccountInfo, NetworkType, SDK_VERSION, TezosOperation, TezosOperationType } from '@airgap/beacon-sdk'
import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlertController, IonContent, ToastController } from '@ionic/angular'
import { TezosBTC } from 'airgap-coin-lib'
import { asyncScheduler, Observable } from 'rxjs'
import { switchMap, throttleTime } from 'rxjs/operators'

import { BeaconService } from '../../services/beacon/beacon.service'
import { ScrollService } from '../../services/scroll/scroll.service'

export const getTezblockLinkForAddress: (
  accountInfo: AccountInfo | undefined,
  address: string
) => Promise<string> = async (accountInfo: AccountInfo | undefined, address: string): Promise<string> => {
  const urls: { [key in NetworkType]: string } = {
    [NetworkType.MAINNET]: 'https://tezblock.io/account/',
    [NetworkType.CARTHAGENET]: 'https://carthagenet.tezblock.io/account/',
    [NetworkType.DELPHINET]: 'https://delphinet.tezblock.io/account/',
    [NetworkType.CUSTOM]: 'https://delphinet.tezblock.io/account/'
  }
  const url: string = urls[accountInfo && accountInfo.network ? accountInfo.network.type : NetworkType.MAINNET]

  return `${url}${address}`
}

export const getTezblockLinkForTxHash: (
  accountInfo: AccountInfo | undefined,
  txHash: string
) => Promise<string> = async (accountInfo: AccountInfo | undefined, txHash: string): Promise<string> => {
  const urls: { [key in NetworkType]: string } = {
    [NetworkType.MAINNET]: 'https://tezblock.io/transaction/',
    [NetworkType.CARTHAGENET]: 'https://carthagenet.tezblock.io/transaction/',
    [NetworkType.DELPHINET]: 'https://delphinet.tezblock.io/transaction/',
    [NetworkType.CUSTOM]: 'https://delphinet.tezblock.io/transaction/'
  }
  const url: string = urls[accountInfo && accountInfo.network ? accountInfo.network.type : NetworkType.MAINNET]

  return `${url}${txHash}`
}

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
      "destination": "tz1hrHoK11TBz3HwWD2YZyZVWUyAg44h3eqd"
    }
  ]`

  public unsignedTransaction: string =
    'f8f9b125f7ef6bbae5ee27f4612220ac93aa7c392ac5f548d15e18c2bd9a7d926c00075da6a7c0ec09c550623fefd8a9cdf40d3d9910ad8100e1dc5fbc500001000012548f71994cb2ce18072d0dcb568fe35fb7493000'
  public broadcastTransaction: string =
    '1ef017b560494ae7b102be63f4d64e64d70114ff4652df23f34ae4460645b3266b00641b67c32672f0b11263b89b05b51e42faa64a3f940ad8d79101904e0000c64ac48e550c2c289af4c5ce5fe52ca7ba7a91d1a411745313e154eff8d118f16c00641b67c32672f0b11263b89b05b51e42faa64a3fdc0bd9d79101bc5000000000641b67c32672f0b11263b89b05b51e42faa64a3f0085dcfbba4a00c5b4f89914c1819ccd8466f6328b74073d50406394e59fe32d89e62112fec2d5a9bc1e6787206fe50e26f90999ae3061ca76247b57e08b6e490a'

  public transferAmount: string = ''
  public transferRecipient: string = ''

  public connectedAccounts: AccountInfo[] = []

  public protocol: TezosBTC = new TezosBTC()

  public beaconSdkVersion: string = SDK_VERSION
  public beaconSdkBeaconId: string | undefined

  constructor(
    private readonly alertController: AlertController,
    private readonly beaconService: BeaconService,
    private readonly route: ActivatedRoute,
    private readonly scrollService: ScrollService,
    private readonly toastController: ToastController
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

    this.beaconService.client.beaconId
      .then((beaconId: string) => {
        this.beaconSdkBeaconId = beaconId
      })
      .catch(console.error)
  }

  public async askForPermissions(): Promise<void> {
    await this.beaconService.client.requestPermissions({
      network: {
        type: this.selectedNetwork as any,
        name: this.networkName,
        rpcUrl: this.networkRpcUrl
      }
    })
  }

  public async showConnectedAccounts(): Promise<void> {
    this.connectedAccounts = await this.beaconService.client.getAccounts()
  }

  public async activateAccount(accountInfo: AccountInfo): Promise<void> {
    await this.beaconService.client.setActiveAccount(accountInfo)
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

  public async getBalanceOfContract(): Promise<void> {
    if (this.activeAccount && this.activeAccount.address) {
      const balance: string = await this.protocol.getBalance(this.activeAccount.address)
      this.contractBalance = balance

      console.log('tzbtc balance', balance)
    } else {
      this.contractBalance = '0'
    }
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: 'Balance updated',
      position: 'bottom',
      duration: 1000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        }
      ]
    })
    toast.present()
  }

  public async tip(): Promise<void> {
    const amount: number = parseFloat(this.tippingAmount) * 1000000
    if (isNaN(amount)) {
      return this.showAlertWithBlockExplorerLink('Error', 'Amount is invalid')
    }

    return this.requestOperationWithAlert(
      [
        {
          kind: TezosOperationType.TRANSACTION,
          amount: amount.toString(),
          destination: 'tz1hrHoK11TBz3HwWD2YZyZVWUyAg44h3eqd'
        }
      ],
      'Thanks for your tip!'
    )
  }

  public async delegate(): Promise<void> {
    return this.requestOperationWithAlert(
      [{ kind: TezosOperationType.DELEGATION, delegate: this.delegationAddress }],
      'Thanks for your delegation!'
    )
  }

  public async transfer(): Promise<void> {
    const amount: number = parseFloat(this.transferAmount) * 1000000
    if (isNaN(amount)) {
      return this.showAlertWithBlockExplorerLink('Error', 'Amount is invalid')
    }

    return this.requestOperationWithAlert(
      [
        {
          kind: TezosOperationType.TRANSACTION,
          amount: amount.toString(),
          destination: this.transferRecipient
        }
      ],
      'The operation has been broadcasted to the network.'
    )
  }

  public async operationRequest(): Promise<void> {
    return this.requestOperationWithAlert(
      JSON.parse(this.rawOperationRequest),
      'The operation has been broadcasted to the network.'
    )
  }

  public async sign(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set')
    }

    await this.beaconService.client.requestSignPayload({
      payload: this.unsignedTransaction,
      sourceAddress: this.activeAccount.address
    })
  }

  public async broadcast(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set')
    }

    await this.beaconService.client.requestBroadcast({
      network: this.activeAccount.network,
      signedTransaction: this.broadcastTransaction
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

  private async showAlertWithBlockExplorerLink(
    header: string,
    message: string,
    transactionHash?: string
  ): Promise<void> {
    const buttons: any[] = []
    if (transactionHash) {
      buttons.push({
        text: 'Open Blockexplorer',
        handler: async (): Promise<void> => {
          window.open(await getTezblockLinkForTxHash(this.activeAccount, transactionHash), '_blank')
        }
      })
    }

    buttons.push('OK')
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header,
      message,
      buttons
    })

    await alert.present()
  }

  private async requestOperationWithAlert(
    operations: Partial<TezosOperation>[],
    _successMessage: string
  ): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }

    try {
      await this.beaconService.client.requestOperation({
        operationDetails: operations as any
      })
    } catch (e) {
      console.log('operation-request error', e)
    }
  }
}
