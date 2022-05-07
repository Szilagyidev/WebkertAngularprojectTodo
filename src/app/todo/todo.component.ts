import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, Form} from '@angular/forms'
import { ITask } from '../model/task';
import { Label } from '../model/label';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;  //késöbb lesz inicializálva -> !:
  tasks: ITask [] = [];
  inprogress: ITask [] = [];
  done: ITask [] = [];
  updateIndex !: any;
  isEditEnabled : boolean = false;
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  labels: Label[] = [{name: 'Important'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.labels.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(label: Label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  user$ = this.authService.currentUser$

  constructor(private fb : FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false,
      label:this.todoForm.value.item
    });
    this.todoForm.reset();
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  onEdit(item:ITask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  deleteTask(i: number){
    this.tasks.splice(i, 1)
  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i, 1)
  }

  deleteDoneTask(i: number){
    this.done.splice(i, 1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
