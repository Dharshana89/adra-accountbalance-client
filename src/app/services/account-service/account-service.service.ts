import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AccountBalance {
  id: any,
  title: string;
  balance: number;
  isEnabled: boolean;
}

interface AccountHistory {
  year: number,
  note: string;
  changeAmount: number;
  month: number;
  addedBy:string;
  addedOn:Date;
}


@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private readonly apiBaseUrl = `${environment.apiUrl}api/ExpenceAccount`;

  constructor(private http: HttpClient) {}

  /** Fetch all account balances */
  fetchBalances(): Observable<AccountBalance[]> {
    return this.http.get<AccountBalance[]>(`${this.apiBaseUrl}/view`);
  }

  fetchAccountHistory(accountId:any): Observable<AccountHistory[]> {
    return this.http.get<AccountHistory[]>(`${this.apiBaseUrl}/viewhistory/${accountId}`);
  }

  /** Upload a balance file */
  uploadBalanceFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiBaseUrl}/upload`, formData);
  }
}
