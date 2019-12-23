import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { PermissionResponse } from '@airgap/beacon-sdk/dist/client/Messages'
import { Storage } from '@ionic/storage'

declare const window

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public connectionStatus: string = 'not connected'
  public addresses: PermissionResponse = []
  public contractAddress: string = 'KT1LH2o12xVRwTpJMZ6QJG74Fox8gE9QieFd'
  public contractBalance: string = ''

  constructor(private readonly alertController: AlertController, private readonly storage: Storage) {
    window.addEventListener('message', async ({ data }) => {
      if (data && data.method && data.data) {
        if (data.method === 'toPage') {
          console.log('received event', event)
          const alert = await this.alertController.create({
            header: 'Permissions granted!',
            message: 'The wallet has granded you permissions to use the address',
            buttons: ['OK']
          })

          this.addresses = [data.data]
          this.storage.set('addresses', [data.data])

          await alert.present()
        }
      }
    })
    this.storage.get('addresses').then(res => {
      if (res) {
        this.addresses = res
      }
    })
  }

  public async initConnection() { }

  public async askForPermissions() {
    window.postMessage({ method: 'toExtension', data: 'permission_request' })
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

    protocol.getBalance(this.addresses[0].address).then(balance => {
      this.contractBalance = balance
      console.log('tzbtc balance', balance)
    })
  }
}
