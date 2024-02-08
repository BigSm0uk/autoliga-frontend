import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {
    setTimeout(() => {
      this.updateClients([
        {
          id: '213',
          fio: 'Бардсика В.В.',
          claim: new Date('2024-01-02'),
          dtpDate: new Date('2024-01-02'),
          carBrand: 'БМВ х5',
          courtStatus: courtsStatus.none,
        },
        {
          id: '214',
          fio: 'Абрамов В.В.',
          number: '+79588386515',
          claim: new Date('2024-01-02'),
          dtpDate: new Date('2024-01-02'),
          carBrand: 'БМВ х5',
          courtStatus: courtsStatus.meeting,
        },
        {
          id: '215',
          fio: 'Жмиська В.В.',
          claim: new Date('2024-01-02'),
          dtpDate: new Date('2024-01-02'),
          carBrand: 'БМВ х5',
          courtStatus: courtsStatus.none,
        },
      ]);
    }, 0);
  }

  private clientsSubject: BehaviorSubject<IClient[]> = new BehaviorSubject<
    IClient[]
  >([]);
  public clients$ = this.clientsSubject.asObservable();

  public updateClients(clients: IClient[]): void {
    this.clientsSubject.next(clients);
  }
}

export interface IClient {
  id: string;
  fio: string;
  number?: string;
  carBrand: string;
  dtpDate: Date;
  insuranceCompany?: string;
  skDate?: Date;
  firstPaymentValue?: string;
  firstPaymentDate?: Date;
  claim?: Date;
  financialCommissioner?: Date;
  courtStatus: courtsStatus;
  manager?: string;
}

export enum courtsStatus {
  none = 'Статус отсутствует',
  meeting = 'Заседание', //заседание
  expertise = 'Экспертиза', //экспертиза
  decision = 'Решение', //решение
  appeal = 'Апелляция', //обжалование
  refund = 'Кассация', //возврат из кассации
  preparation = 'Подготовка', //подготовка
}
