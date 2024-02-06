import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './_guards/auth.guard';
import { FormsComponent } from './forms/forms.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { FormControlComponent } from './form-control/form-control.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';

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
        path: 'form/:id',
        component: FormComponent,
      },
      {
        path: 'control',
        component: FormControlComponent,
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
        path: 'client',
        component: ClientComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
