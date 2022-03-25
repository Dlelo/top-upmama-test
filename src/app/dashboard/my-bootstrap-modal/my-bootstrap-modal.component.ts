import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './my-bootstrap-modal.component.html',
  styleUrls: ['./my-bootstrap-modal.component.scss']
})
export class MyBootstrapModalComponent implements OnInit {
  title: '' = "";
  body: '' = "";

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }
  closeModal(e: any) {
    this.activeModal.close();
    console.log(e)
  }

}
