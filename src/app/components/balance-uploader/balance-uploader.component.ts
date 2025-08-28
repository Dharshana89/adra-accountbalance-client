import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account-service/account-service.service';

@Component({
  selector: 'app-balance-uploader',
  templateUrl: './balance-uploader.component.html',
  styleUrls: ['./balance-uploader.component.scss']
})
export class BalanceUploaderComponent {
  selectedFile: File | null = null;

  constructor(
    private uploadService: AccountServiceService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    this.uploadService.uploadBalanceFile(this.selectedFile).subscribe({
      next: () => {
        alert('File uploaded successfully.');
        this.router.navigate(['/view']);
      },
      error: (error) => {
        console.error('Upload error:', error);
        alert('Error uploading file: ' + (error?.error?.message || 'Unknown error'));
      }
    });
  }
}
