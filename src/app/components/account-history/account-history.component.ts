import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';

interface AccountHistory {
  year: number,
  note: string;
  changeAmount: number;
  month: number;
  addedBy:string;
  addedOn:Date;
}

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss']
})
export class AccountHistoryComponent {
  accounts: AccountHistory[] = [];
  loading: boolean = true;
  accountId!: string;

  constructor(private accoutService: AccountServiceService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    this.fetchAccountHistory(this.accountId);
  }

  fetchAccountHistory(accountId: any): void {
    this.accoutService.fetchAccountHistory(accountId).subscribe({
      next: (data: AccountHistory[]) => {
        this.accounts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.handleError(err);
        this.loading = false;
      },
    });
  }
  private handleError(error: any): void {
    let message = 'Failed to load account balances';

    if (error?.error) {
      if (typeof error.error === 'string') {
        message += `: ${error.error}`;
      } else if (typeof error.error === 'object') {
        message += `: ${error.error.message || JSON.stringify(error.error)}`;
      }
    }

    console.log(message);
  }
}
