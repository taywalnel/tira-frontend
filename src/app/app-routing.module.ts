import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivePageComponent } from './components/pages/archive/archive-page.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { WorkflowPageComponent } from './components/pages/workflow/workflow-page.component';

const routes: Routes = [
  {
    path: '', component: WorkflowPageComponent
  },
  {
    path: 'tickets', component: ArchivePageComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
