import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Todo } from '../../users/users';
import {DecimalPipe} from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
  todos: Todo[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(todos: Todo[], column: SortColumn, direction: string): Todo[] {
  if (direction === '' || column === '') {
    return todos;
  } else {
    return [...todos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(todo: Todo, term: string, pipe:PipeTransform) {
  return todo.first_name.toLowerCase().includes(term.toLowerCase())
    || todo.last_name.toLocaleLowerCase().includes(term.toLowerCase())
    || todo.email.toLocaleLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })

export class TableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _todos$ = new BehaviorSubject<Todo[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  todoArray = [] as any;

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._todos$.next(result.todos);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get todos$() { return this._todos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let todos = sort(this.todoArray, sortColumn, sortDirection);

    // 2. filter
    todos = todos.filter(todo => matches(todo, searchTerm, this.pipe));
    const total = todos.length;

    // 3. paginate
    todos = todos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({todos, total});
  }

  // private _loading$ = new BehaviorSubject<boolean>(true);

  // get loading$() {
  //   return this._loading$.asObservable();
  // }

  // private _todos$ = new BehaviorSubject<Todo[]>([]);

  // get todos$() {
  //   return this._todos$.asObservable();
  // }

  // private _total$ = new BehaviorSubject<number>(0);

  // get total$() {
  //   return this._total$.asObservable();
  // }

  // get page() {
  //   return this._state.page;
  // }

  // set page(page: number) {
  //   this._set({ page });
  // }

  // get pageSize() {
  //   return this._state.pageSize;
  // }

  // set pageSize(pageSize: number) {
  //   this._set({ pageSize });
  // }

  // get searchTerm() {
  //   return this._state.searchTerm;
  // }

  // set searchTerm(searchTerm: string) {
  //   this._set({ searchTerm });
  // }

  // set sortColumn(sortColumn: string) {
  //   this._set({ sortColumn });
  // }

  // set sortDirection(sortDirection: SortDirection) {
  //   this._set({ sortDirection });
  // }

  // public _search(): Observable<SearchResult> {
  //   const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

  //   // 1. sort
  //   let todos = sort(this.todoArray, sortColumn, sortDirection);

  //   // 2. filter
  //   todos = todos.filter(todo => matches(todo, searchTerm));
  //   const total = todos.length;

  //   // 3. paginate
  //   todos = todos.map((todo, i) => ({ id: i + 1, ...todo }));
  //   todos = todos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  //   return of({ todos, total });
  // }

  // private _set(patch: Partial<State>) {
  //   Object.assign(this._state, patch);
  //   this._search$.next();
  // }
}
