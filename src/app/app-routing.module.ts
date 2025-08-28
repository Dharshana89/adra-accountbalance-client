import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceUploaderComponent } from './components/balance-uploader/balance-uploader.component';
import { BalanceViewerComponent } from './components/balance-viewer/balance-viewer.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthGuard } from './services/auth-service/guards/auth.guard';
import { AccountHistoryComponent } from './components/account-history/account-history.component';


const routes: Routes = [
  { path: 'upload', component: BalanceUploaderComponent , canActivate: [AuthGuard]},  
  { path: 'view', component: BalanceViewerComponent , canActivate: [AuthGuard]}, 
  { path: 'login', component: UserLoginComponent },
  { path: 'account-history/:id', component: AccountHistoryComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
