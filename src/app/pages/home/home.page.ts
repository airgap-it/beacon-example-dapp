import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { TezosFAProtocol } from 'airgap-coin-lib/dist/protocols/tezos/fa/TezosFAProtocol'
import { PermissionResponse } from '@airgap/beacon-sdk/dist/client/Messages'
import { Storage } from '@ionic/storage'
import { DAppClient } from '@airgap/beacon-sdk/dist/client/clients/DappClient'
import { TezosOperationType } from '@airgap/beacon-sdk/dist/client/operations/OperationTypes'

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
  public address: string = ''

  public client: DAppClient = new DAppClient('DApp')

  public unsignedTransaction: string = ''
  public broadcastTransaction: string = ''

  public protocol = new TezosFAProtocol({
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


  constructor(private readonly alertController: AlertController, private readonly storage: Storage) {
    this.storage.get('addresses').then(res => {
      if (res) {
        this.addresses = res
        this.protocol.getAddressFromPublicKey(this.addresses[0].permissions.pubkey).then(address => this.address = address)
      }
    })
  }

  public async initConnection() { }

  public async askForPermissions() {
    this.client.requestPermissions().then(async response => {
      this.permissionGrantedAlert(response)
    }).catch(err => { console.log('PERMISSION ERROR', err) })
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

    await alert.present()
  }

  public async getBalanceOfContract() {

    this.protocol.getBalance(this.address).then(balance => {
      this.contractBalance = balance
      console.log('tzbtc balance', balance)
    })
  }

  public async delegate() {
    this.client.requestOperation({ network: 'mainnet', operationDetails: { kind: TezosOperationType.DELEGATION } }).then(async response => {
      console.log(response)
      const alert = await this.alertController.create({
        header: 'delegate',
        message: 'Done!',
        buttons: ['OK']
      })

      await alert.present()
    }).catch(err => { console.log('DELEGATE ERROR', err) })
  }

  public async operationRequest() {
    this.client.requestOperation({ network: 'mainnet', operationDetails: { kind: TezosOperationType.DELEGATION } }).then(async response => {
      console.log(response)
      const alert = await this.alertController.create({
        header: 'operationRequest',
        message: 'Done!',
        buttons: ['OK']
      })

      await alert.present()
    }).catch(err => { console.log('OPERATION ERROR', err) })
  }

  public async sign() {
    this.client.signPayloads({ payload: [Buffer.from('')], sourceAddress: '' }).then(async response => {
      console.log(response)
      const alert = await this.alertController.create({
        header: 'sign',
        message: 'Done!',
        buttons: ['OK']
      })

      await alert.present()
    }).catch(err => { console.log('SIGN ERROR', err) })
  }

  public async broadcast() {
    this.client.requestBroadcast({ network: 'mainnet', signedTransaction: [Buffer.from(this.broadcastTransaction)] }).then(async response => {
      console.log(response)
      const alert = await this.alertController.create({
        header: 'broadcast',
        message: 'Done!',
        buttons: ['OK']
      })

      await alert.present()
    }).catch(err => { console.log('BROADCAST ERROR', err) })
  }

}
