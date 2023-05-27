import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivePageComponent } from './pages/archive/archive-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WorkflowPageComponent } from './pages/workflow/workflow-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowPageComponent,
  },
  {
    path: 'tickets',
    component: ArchivePageComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
