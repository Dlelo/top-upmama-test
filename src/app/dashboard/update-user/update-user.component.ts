

import { Component, OnInit, Output } from '@angular/core';
import { Todo } from './../users/users';
import { ActivatedRoute, Router } from '@angular/router';
import {TopupmamaService } from '../../service/topupmama.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../../components/alert/alert.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  form!: FormGroup;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    job: new FormControl(''),
  });
  id!: string;
  todo!: Todo;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TopupmamaService,
              private ngbModal: NgbModal,
              private formBuilder: FormBuilder, private alertService: AlertService) {
  }

  ngOnInit(): void {
      this.todo = new Todo();
      this.form = this.formBuilder.group({
        name: [''],
        job: ['']
    });
      this.id = this.route.snapshot.params['id'];

      this.todoService.getAUser(this.id)
          .subscribe(data => {
              console.log(data);
              this.todo = data;
          }, error => this.alertService.error(error));
  }

  onSubmit() {
    console.log('form data', this.form.value)
      this.todoService.updateUser(this.id, this.form.value)
          .subscribe(data => console.log(data), error => this.alertService.error(error));
      console.log('Submit clicked');
      setTimeout(() => {
          this.router.navigate(['/dashboard/users']);
      }, 300);
  }


}
