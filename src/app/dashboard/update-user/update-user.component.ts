

import { Component, OnInit, Output } from '@angular/core';
import { Todo } from './../users/users';
import { ActivatedRoute, Router } from '@angular/router';
import {TopupmamaService } from '../../service/topupmama.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {


  id!: string;
  todo!: Todo;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TopupmamaService,
              private ngbModal: NgbModal) {
  }

  ngOnInit(): void {
      this.todo = new Todo();
      this.id = this.route.snapshot.params['id'];
      this.todoService.getTodo(this.id)
          .subscribe(data => {
              console.log(data);
              this.todo = data;
          }, error => console.log(error));
  }

  onSubmit() {
      this.todoService.updateTodo(this.id, this.todo)
          .subscribe(data => console.log(data), error => console.log(error));
      console.log('Submit clicked');
      setTimeout(() => {
          this.router.navigate(['/todos']);
      }, 300);
  }


}
