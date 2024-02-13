import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './_guards/auth.guard';
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { ReportComponent } from './report/report.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
};
const routes: Routes = [
  { path: '', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'forms',
        component: FormsComponent,
      },
      {
        path: 'form/:formId',
        component: FormComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'client/:id',
        component: ClientComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
