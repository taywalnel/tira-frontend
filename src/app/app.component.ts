import { Component } from '@angular/core';
import { ModalService } from './services/modalService/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public modalService: ModalService) { }

}
