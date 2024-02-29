import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './_guards/auth.guard';
import { LayoutsComponent } from './layouts/layouts.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { ReportComponent } from './report/report.component';
import { GenerateComponent } from './generate/generate.component';
import { GuideComponent } from './guide/guide.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

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
        path: 'layouts',
        component: LayoutsComponent,
      },
      {
        path: 'layout/:id',
        component: LayoutComponent,
      },
      {
        path: 'layout',
        component: LayoutComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'generate',
        component: GenerateComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
    ],
  },
  { path: 'guide', component: GuideComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
