import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../components/alert/alert.service';
import { TopupmamaService } from '../../service/topupmama.service';
import { Todo } from '../users/users';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id!: string;
  todo!: Todo;
  userdetails!:any

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TopupmamaService,
    private ngbModal: NgbModal,private alertService: AlertService
) {
}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //console.log('user', this.id)
      this.todoService.getAUser(this.id)
          .subscribe(data => {
              console.log(data);
              this.userdetails = data.data;
          }, error =>
          this.alertService.error(error)
          );
  }

}
