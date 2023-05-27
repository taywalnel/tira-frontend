import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CreateTicketModalComponent } from './modals/create-ticket-modal/create-ticket-modal.component';
import { ModalTemplateComponent } from './modals/modal-template/modal-template.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { WorkflowSectionComponent } from './components/workflow-section/workflow-section.component';
import { ArchivePageComponent } from './pages/archive/archive-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WorkflowPageComponent } from './pages/workflow/workflow-page.component';
import { FilterByStatusPipe } from './pipes/filter-by-status.pipe';
import { FormatIdPipe } from './pipes/format-id.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkflowSectionComponent,
    TicketComponent,
    HeaderBarComponent,
    WorkflowPageComponent,
    ArchivePageComponent,
    SettingsComponent,
    ModalTemplateComponent,
    CreateTicketModalComponent,
    FilterByStatusPipe,
    FormatIdPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
