import { AccountInfo, OperationResponseOutput, TezosOperationType } from '@airgap/beacon-sdk'
import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { BeaconService } from 'src/app/services/beacon/beacon.service'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'beacon-sample-contract',
  templateUrl: './sample-contract.component.html',
  styleUrls: ['./sample-contract.component.scss']
})
export class SampleContractComponent {
  public activeAccount$: Observable<AccountInfo>
  public activeAccount: AccountInfo | undefined

  public newNumber: number = 0
  public newFlag: boolean = false

  public number: number | undefined
  public flag: boolean | undefined

  private readonly contractDestination: string = 'KT1RxKJyi48W3bZR8HErRiisXZQw19HwLGWj'

  constructor(
    private readonly http: HttpClient,
    private readonly beaconService: BeaconService,
    private readonly toastController: ToastController
  ) {
    this.activeAccount$ = this.beaconService.activeAccount$
    this.activeAccount$.subscribe((activeAccount: AccountInfo) => {
      this.activeAccount = activeAccount
    })

    this.getState().catch(console.error)
  }

  public async getState(): Promise<void> {
    const result: any = await this.http
      .get(
        'https://tezos-carthagenet-node-1.kubernetes.papers.tech/chains/main/blocks/head/context/contracts/KT1RxKJyi48W3bZR8HErRiisXZQw19HwLGWj/storage'
      )
      .toPromise()

    this.number = result.args[0].int
    this.flag = result.args[1].prim

    const toast: HTMLIonToastElement = await this.toastController.create({
      message: 'State updated',
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

  public async setNumber(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }

    const response: OperationResponseOutput = await this.beaconService.client.requestOperation({
      operationDetails: [
        {
          kind: TezosOperationType.TRANSACTION,
          amount: '0',
          destination: this.contractDestination,
          parameters: {
            entrypoint: 'setNumber',
            value: {
              int: this.newNumber.toString()
            }
          }
        }
      ]
    })
    console.log(response)
  }

  public async setFlag(): Promise<void> {
    if (!this.activeAccount) {
      throw new Error('No active account set!')
    }

    const response: OperationResponseOutput = await this.beaconService.client.requestOperation({
      operationDetails: [
        {
          kind: TezosOperationType.TRANSACTION,
          amount: '0',
          destination: this.contractDestination,
          parameters: {
            entrypoint: 'toggleStatus',
            value: {
              prim: this.newFlag ? 'True' : 'False'
            }
          }
        }
      ]
    })
    console.log(response)
  }
}
