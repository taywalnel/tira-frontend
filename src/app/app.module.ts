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
import { TicketComponent } from './components/atoms/ticket/ticket.component';
import { CreateTicketModalComponent } from './components/modals/create-ticket-modal/create-ticket-modal.component';
import { ModalTemplateComponent } from './components/modals/modal-template/modal-template.component';
import { HeaderBarComponent } from './components/molecules/header-bar/header-bar.component';
import { WorkflowSectionComponent } from './components/molecules/workflow-section/workflow-section.component';
import { ArchivePageComponent } from './components/pages/archive/archive-page.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { WorkflowPageComponent } from './components/pages/workflow/workflow-page.component';
import { FilterByStatusPipe } from './pipes/filter-by-status.pipe';


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
    FilterByStatusPipe
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
