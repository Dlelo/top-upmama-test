import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../components/alert/alert.service';
import { TopupmamaService } from '../../service/topupmama.service';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './my-bootstrap-modal.component.html',
  styleUrls: ['./my-bootstrap-modal.component.scss']
})
export class MyBootstrapModalComponent implements OnInit {
  title: '' = "";
  body: '' = "";

  constructor( public activeModal: NgbActiveModal,private route: ActivatedRoute, private router: Router, private todoService: TopupmamaService,
   private alertService: AlertService ) { }

  ngOnInit(): void {
  }
  closeModal(e: any) {
    this.activeModal.close();
    console.log(e)
  }


}
