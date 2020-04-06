import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() {}

  private currentTab: string = 'approach'
  private readonly scrollSource = new Subject<any>()
  private readonly selectedTabSource = new BehaviorSubject<string>('approach')

  private readonly tabsInOrder = [
    'approach',
    'wallets_dapps',
    'transport_layer',
    'message_types',
    'permissionRequest',
    'operationRequest',
    'signPayloadRequest',
    'broadcastRequest'
  ]

  public scroll$ = this.scrollSource.asObservable()
  public currentSelectedTab$ = this.selectedTabSource.asObservable()

  public scrollTo(element: string) {
    this.scrollSource.next(element)
  }

  public setCurrentSelectedTab(element: string) {
    this.currentTab = element
    this.selectedTabSource.next(element)
  }

  public selectNewTab(nextOrPrevious: string) {
    const idx = this.tabsInOrder.indexOf(this.currentTab)
    let newSelectedTab
    if (nextOrPrevious === 'next') {
      newSelectedTab = this.tabsInOrder[idx + 1] ? this.tabsInOrder[idx + 1] : this.tabsInOrder[idx]
      this.selectedTabSource.next(newSelectedTab)
    } else if (nextOrPrevious === 'previous') {
      newSelectedTab = this.tabsInOrder[idx - 1] ? this.tabsInOrder[idx - 1] : this.tabsInOrder[0]
      this.selectedTabSource.next(newSelectedTab)
    }
    this.currentTab = newSelectedTab
  }

  public getFirstTab() {
    return this.tabsInOrder[0]
  }
}
