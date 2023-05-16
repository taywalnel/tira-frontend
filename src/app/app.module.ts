import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderCardComponent } from './components/atoms/order-card/order-card.component';
import { HeaderBarComponent } from './components/molecules/header-bar/header-bar.component';
import { OrderTimelineSectionComponent } from './components/molecules/order-timeline-section/order-timeline-section.component';
import { SideNavComponent } from './components/molecules/side-nav/side-nav.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { OrderTimelineComponent } from './components/pages/order-timeline/order-timeline.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderTimelineSectionComponent,
    OrderCardComponent,
    HeaderBarComponent,
    SideNavComponent,
    OrderTimelineComponent,
    OrderHistoryComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
