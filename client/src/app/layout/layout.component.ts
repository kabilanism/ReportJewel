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
    this.showControlConfig = false;
    this.layoutSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.layoutService.layoutMode$.pipe(take(1)).subscribe({
      next: (mode: Mode) => {
        this.mode = mode;
        if (this.mode === Mode.Edit) {
          const layoutId: number = Number(
            this.route.snapshot.paramMap.get('id')
          );
          this.layoutService.getLayout(layoutId).subscribe({
            next: (layout: Layout) => {
              this.layout = layout;
              this.layoutConfig.get('name')?.setValue(this.layout?.name);
              this.layoutConfig
                .get('description')
                ?.setValue(this.layout?.description);
            },
          });
        }
      },
    });

    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.layoutSubscription.unsubscribe();
  }

  addLayout() {
    const layoutToAdd: LayoutNew = {
      name: this.layoutConfig.get('name')?.value.toString(),
      description: this.layoutConfig.get('description')?.value.toString(),
    };

    return this.layoutService.addLayout(layoutToAdd);
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
    if (this.mode === Mode.Add) {
      this.addLayout().subscribe({
        next: (layout: Layout) => {
          this.toastr.success(`Layout '${layout.name}' added successfully.`);
          this.router.navigateByUrl('/layouts');
        },
      });
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

  onControlDeleted(control: LayoutControl) {
    if (this.layout) {
      this.showControlConfig = false;

      const controls = this.layout.controls.slice();
      const deletedControlIndex = controls.indexOf(control);
      controls.splice(deletedControlIndex, 1);

      this.layout.controls = controls;
    }
  }

  onControlSaved(control: LayoutControl) {
    if (this.layout) {
      const savedControls = this.layout.controls;
      const savedControl = savedControls.find((c) => c.id === control.id);
      if (savedControl) {
        const savedControlIndex = this.layout.controls.indexOf(savedControl);
        savedControls[savedControlIndex] = control;
      } else {
        savedControls.push(control);
      }
    }
  }
}
