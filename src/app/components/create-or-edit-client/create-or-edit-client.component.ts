import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ClientService,
  IClient,
  courtsStatus,
} from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-or-edit-client',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-or-edit-client.component.html',
  styleUrl: './create-or-edit-client.component.scss',
})
export class CreateOrEditClientComponent implements OnInit, OnDestroy {
  editClientForm?: FormGroup;
  get _fio() {
    return this.editClientForm?.get('fio');
  }
  get _carsBrand() {
    return this.editClientForm?.get('carsBrand');
  }
  get _number() {
    return this.editClientForm?.get('number');
  }
  get _dtpDate() {
    return this.editClientForm?.get('dtpDate');
  }
  get _select() {
    return this.editClientForm?.get('select');
  }

  submitForm() {
    console.log(this.editClientForm?.value);
  }

  constructor(private route: ActivatedRoute) {}

  public client?: IClient;
  public clientService = inject(ClientService); // получаем сервис
  public clientId: string = '0';
  public courtStatus = courtsStatus;
  public currCourtStatus: courtsStatus = this.courtStatus.none;

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((params) => {
      this.clientId = params['id'];
    });
    this.client$ = this.clientService.clients$.subscribe((clients) => {
      this.client = clients.find((x) => x.id === this.clientId);
      if (!this.client) {
        return;
      }
      this.editClientForm = new FormGroup({
        fio: new FormControl(this.client.fio, [Validators.required]),
        number: new FormControl(this.client.number ?? '', [
          Validators.required,
          Validators.pattern('[- +()0-9]{12,12}'),
        ]),
        carsBrand: new FormControl(this.client.carBrand ?? '', [
          Validators.required,
        ]),
        dtpDate: new FormControl<string>(
          this.formatDateForInput(this.client.dtpDate),
          Validators.required
        ),
        insuranceCompany: new FormControl(this.client.insuranceCompany ?? ''),
        skDate: new FormControl<string>(
          !this.client.skDate ? '' : this.formatDateForInput(this.client.skDate)
        ),
        firstPaymentValue: new FormControl(this.client.firstPaymentValue ?? ''),
        firstPaymentDate: new FormControl<string>(
          !this.client.firstPaymentDate
            ? ''
            : this.formatDateForInput(this.client.firstPaymentDate)
        ),
        claim: new FormControl<string>(
          !this.client.claim ? '' : this.formatDateForInput(this.client.claim)
        ),
        financialCommissioner: new FormControl<string>(
          !this.client.financialCommissioner
            ? ''
            : this.formatDateForInput(this.client.financialCommissioner)
        ),
        select: new FormControl<courtsStatus>(
          this.client.courtStatus ?? courtsStatus.none,
          Validators.required
        ),
        manager: new FormControl(this.client.manager ?? ''),
      });
    });
  }
  ngOnDestroy(): void {
    this.route$?.unsubscribe;
    this.client$?.unsubscribe;
  }

  parseInputDate(inputDate: string): Date {
    const parts = inputDate.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private route$?: Subscription;
  private client$?: Subscription;
}
