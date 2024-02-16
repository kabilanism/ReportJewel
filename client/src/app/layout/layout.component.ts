import { Component, OnDestroy, OnInit } from '@angular/core';
import { Layout } from '../_models/layout';
import { LayoutService } from '../_services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { LayoutNew } from '../_models/layoutNew';
import { LayoutControl } from '../_models/layoutControl';
import { Mode } from '../_models/mode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css', '../_styles/form.styles.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  layoutConfig: FormGroup;
  layout: Layout | undefined;
  layoutSubscription: Subscription;
  addMode: boolean;
  showControlConfig: boolean;
  user: User | undefined;
  mode: Mode | undefined;
  readonly Mode = Mode;

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.layoutConfig = this.formBuilder.group({
      name: [''],
      description: [''],
    });
    this.addMode = false;
    this.showControlConfig = false;
    this.layoutSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.addMode = params['addMode'];

      if (!this.addMode) {
        this.layoutSubscription = this.getLayout();
      }
    });

    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  getLayout() {
    return this.layoutService.getLayouts().subscribe({
      next: (layouts: Layout[] | null) => {
        if (layouts) {
          console.log(layouts);
          console.log(this.route.snapshot.paramMap);
          let layoutId = Number(this.route.snapshot.paramMap.get('id'));
          this.layout = layouts.find((f) => f.id == layoutId);

          this.layoutConfig.get('name')?.setValue(this.layout?.name);
          this.layoutConfig
            .get('description')
            ?.setValue(this.layout?.description);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  addLayout() {
    if (this.user) {
      const layoutToAdd: LayoutNew = {
        userId: this.user.id,
        name: this.layoutConfig.get('name')?.value.toString(),
        description: this.layoutConfig.get('description')?.value.toString(),
      };

      this.layoutService.addLayout(layoutToAdd).subscribe({
        next: (addedLayout: Layout) => {
          this.toastr.success('Report layout added successfully.');
        },
      });
    }
  }

  updateLayout() {
    if (this.user && this.layout) {
      let updatedLayout = { id: this.layout?.id, ...this.layoutConfig?.value };
      this.layoutService.updateLayout(updatedLayout).subscribe({
        next: (updatedLayout: Layout) => {
          this.layout = updatedLayout;
          this.toastr.success('Report layout updated successfully.');
        },
      });
    }
  }

  deleteLayout() {
    if (this.user && this.layout) {
      this.layoutService.deleteLayout(this.layout).subscribe({
        next: (_) => {
          this.toastr.success('Layout deleted successfully.');
          this.router.navigateByUrl('/layouts');
        },
        error: (error) => {
          this.toastr.error('An error occurred while deleting the layout.');
        },
      });
    }
  }

  saveLayout() {
    if (this.addMode) {
      this.addLayout();
    } else {
      this.updateLayout();
    }
  }

  selectControl(control: LayoutControl) {
    this.layoutService.setSelectedControl(control);
    this.layoutService.setControlMode(Mode.Edit);
    this.showControlConfig = true;
  }

  addControl() {
    this.layoutService.setControlMode(Mode.Add);
    this.showControlConfig = true;
  }

  onControlDeleted() {
    this.showControlConfig = false;
  }
}
