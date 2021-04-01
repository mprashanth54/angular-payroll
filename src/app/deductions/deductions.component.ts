import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeductionsService } from '../services/deductions.service';


@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css']
})
export class DeductionsComponent implements OnInit {

  deductions: any = []
  constructor(private ds: DeductionsService, private router: Router) {
  }

  async ngOnInit(): Promise<any> {
    this.deductions = await this.ds.getDeductions().toPromise()

  }

  goToDeduction(id: string): void {
    this.router.navigate([`/deductions/${id}/update`])
  }

}
