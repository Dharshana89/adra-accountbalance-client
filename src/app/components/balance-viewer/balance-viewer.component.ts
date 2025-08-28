import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../services/account-service/account-service.service';
import { Router } from '@angular/router';

interface AccountBalance {
  id: any,
  title: string;
  balance: number;
  isEnabled: boolean;
}

@Component({
  selector: 'app-balance-viewer',
  templateUrl: './balance-viewer.component.html',
  styleUrls: ['./balance-viewer.component.scss'],
})
export class BalanceViewerComponent implements OnInit {
  accounts: AccountBalance[] = [];
  loading: boolean = true;

  constructor(private accoutService: AccountServiceService,private router: Router) {}

  ngOnInit(): void {
    this.fetchAccountBalances();
  }

  fetchAccountBalances(): void {
    this.accoutService.fetchBalances().subscribe({
      next: (data: AccountBalance[]) => {
        this.accounts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.handleError(err);
        this.loading = false;
      },
    });
  }

  //Route to Account History
  goToAccountHistory(accountId: any): void {
    this.router.navigate(['/account-history', accountId]);
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
