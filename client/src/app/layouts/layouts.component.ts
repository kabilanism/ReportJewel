import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';
import { Layout } from '../_models/layout';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent implements OnInit, OnDestroy {
  layouts: Layout[] = [];
  layoutsSubscription: Subscription | undefined;
  showNoLayouts: boolean = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutsSubscription = this.layoutService.getLayouts().subscribe({
      next: (layouts: Layout[] | null) => {
        if (layouts) {
          if (layouts.length === 0) {
            this.showNoLayouts = true;
          }

          this.layouts = layouts;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.layoutsSubscription?.unsubscribe();
  }
}
