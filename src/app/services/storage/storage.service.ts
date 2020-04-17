import { AccountInfo } from '@airgap/beacon-sdk'
import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

export enum SettingsKey {
  ACTIVE_ACCOUNT = 'activeAccount'
}

interface SettingsKeyReturnType {
  [SettingsKey.ACTIVE_ACCOUNT]: AccountInfo
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private readonly storage: Storage) {}

  public async get<K extends SettingsKey>(key: K): Promise<SettingsKeyReturnType[K]> {
    const value: SettingsKeyReturnType[K] = await this.storage.get(key)
    console.log(`[SETTINGS_SERVICE:get] ${key}, returned:`, value)

    return value
  }

  public async set<K extends SettingsKey>(key: K, value: SettingsKeyReturnType[K]): Promise<any> {
    console.log(`[SETTINGS_SERVICE:set] ${key}`, value)

    return this.storage.set(key, value)
  }

  public async delete<K extends SettingsKey>(key: K): Promise<boolean> {
    try {
      await this.storage.remove(key)

      return true
    } catch (error) {
      return false
    }
  }

  public async getCache<T>(key: string): Promise<T> {
    return this.storage.get(key)
  }

  public async setCache<T>(key: string, value: T): Promise<T> {
    return this.storage.set(key, value)
  }
}
