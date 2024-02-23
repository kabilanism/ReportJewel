import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Layout } from '../_models/layout';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent implements OnInit, OnDestroy {
  layouts: Layout[] = [];
  layoutsSubscription: Subscription | undefined;
  showNoLayouts: boolean = false;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;
  userParams: UserParams | undefined;

  constructor(private layoutService: LayoutService) {
    this.userParams = this.layoutService.getUserParams();
    console.log('user params is:', this.userParams);
  }

  ngOnInit(): void {
    this.loadLayouts();
  }

  ngOnDestroy(): void {
    this.layoutsSubscription?.unsubscribe();
  }

  loadLayouts() {
    if (this.userParams) {
      this.layoutsSubscription = this.layoutService
        .getLayouts(this.userParams)
        .subscribe({
          next: (response) => {
            console.log('the response is:', response);
            if (response.result && response.pagination) {
              this.layouts = response.result;
              this.pagination = response.pagination;
            }
          },
        });
    }
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.loadLayouts();
    }
  }
}
