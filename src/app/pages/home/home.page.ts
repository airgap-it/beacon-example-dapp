import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { PermissionResponse } from '@airgap/beacon-sdk/dist/client/Messages'
import { Storage } from '@ionic/storage'
import { DAppClient } from '@airgap/beacon-sdk/dist/client/clients/DappClient'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public connectionStatus: string = 'not connected'
  public addresses: PermissionResponse[] = []
  public contractAddress: string = 'KT1LH2o12xVRwTpJMZ6QJG74Fox8gE9QieFd'
  public contractBalance: string = ''

  public client: DAppClient = new DAppClient('DApp')

  constructor(private readonly alertController: AlertController, private readonly storage: Storage) {
    window.addEventListener('message', async ({ data }) => {
      console.log('PAGE', data)

    })

    this.storage.get('addresses').then(res => {
      if (res) {
        this.addresses = res
      }
    })
  }

  public async initConnection() { }

  public async askForPermissions() {
    this.client.requestPermissions().then(async response => {
      console.log('PERMISSION RESULT', response)
      const alert = await this.alertController.create({
        header: 'Permissions granted!',
        message: 'The wallet has granded you permissions to use the address',
        buttons: ['OK']
      })

      this.addresses = [response]
      this.storage.set('addresses', [response])

      await alert.present()
    }).catch(err => { console.log('PERMISSION ERROR', err) })
  }

  public async sign() { }

  public async getBalanceOfContract() {
    const protocol = new TezosFAProtocol({
      symbol: 'TZBTC',
      name: 'Tezos BTC',
      marketSymbol: 'btc',
      identifier: 'xtz-btc',
      contractAddress: this.contractAddress,
      jsonRPCAPI: "https://tezos-babylonnet-node-1.kubernetes.papers.tech",
      baseApiUrl: "https://tezos-babylonnet-conseil-1.kubernetes.papers.tech",
      baseApiKey: 'airgap00391',
      baseApiNetwork: 'babylonnet'
    })

    const address = await protocol.getAddressFromPublicKey(this.addresses[0].permissions.pubkey)

    protocol.getBalance(address).then(balance => {
      this.contractBalance = balance
      console.log('tzbtc balance', balance)
    })
  }
}
