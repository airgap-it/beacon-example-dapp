import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { TezosProtocol } from 'airgap-coin-lib'

declare const window

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public connectionStatus: string = 'not connected'
  public addresses = []
  constructor(private readonly alertController: AlertController) {
    window.addEventListener('message', async ({ data }) => {
      if (data && data.method && data.data) {
        if (data.method === 'toPage') {
          console.log('received event', event)
          const alert = await this.alertController.create({
            header: 'Permissions granted!',
            message: 'The wallet has granded you permissions to use the address',
            buttons: ['OK']
          })

          this.addresses = data.data

          await alert.present()
        }
      }
    })
  }

  public async initConnection() {}

  public async askForPermissions() {
    window.postMessage({ method: 'toExtension', data: 'permission_request' })
  }

  public async sign() {}

  public async getBalanceOfContract() {
    const contractAddress = ''
    const protocol = new TezosProtocol()
  }
}
