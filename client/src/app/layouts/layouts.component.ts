import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Layout } from '../_models/layout';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { Mode } from '../_models/mode';

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

  constructor(private layoutService: LayoutService, private router: Router) {
    this.userParams = this.layoutService.getUserParams();
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

  onAddLayout() {
    this.layoutService.setLayoutMode(Mode.Add);
    this.router.navigateByUrl('/layout');
  }

  selectLayout(id: number) {
    this.layoutService.setLayoutMode(Mode.Edit);
    this.router.navigateByUrl(`/layout/${id}`);
  }
}
