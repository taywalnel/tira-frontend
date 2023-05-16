import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { OrderTimelineComponent } from './components/pages/order-timeline/order-timeline.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

const routes: Routes = [
  {
    path: '', component: OrderTimelineComponent
  },
  {
    path: 'history', component: OrderHistoryComponent
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
