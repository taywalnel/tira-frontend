import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modalService/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent {
  constructor(public modalService: ModalService) { }

}
