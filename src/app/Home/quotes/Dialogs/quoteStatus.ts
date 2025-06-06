import { Component, Inject, ViewChild, computed, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Quote } from '../../../Objets/Interfaces';

@Component({
  selector: 'app-searchClient',
  standalone: true,
  imports: [MatCheckbox, MatButtonModule],
  templateUrl: './quoteStatus.html',
  styleUrl: './styles.css'
})
export class dialogQuoteStatus {

  constructor(private dialogRef: MatDialogRef<dialogQuoteStatus>, @Inject(MAT_DIALOG_DATA) public data:Quote,){}

  readonly task = signal<Task>({
    name: 'Entregado',
    completed: false,
    subtasks: [
      {name: 'Revisión', completed: true},
      {name: 'En espera', completed: false},
      {name: 'Surtiendo', completed: false},
      {name: 'Finalizado', completed: false},
      {name: 'Entregado', completed: false}
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task;
    if (!task().subtasks) {
      return false;
    }
    return task().subtasks?.some(t => t.completed) && !task().subtasks?.every(t => t.completed);
  });

  ngOnInit(){
    console.log(this.data);
    for(let i in this.task().subtasks!){
      if(this.task().subtasks![i].name == this.data.status){
        this.update(true, Number(i));
      }
    }
  }

  update(completed: boolean, index?: number){
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        if(completed)
          for(let i = 0; i <= index; i++)
            task.subtasks![i].completed = completed;
        else
          for(let i = index; i < task.subtasks!.length; i++)
            task.subtasks![i].completed = completed;

        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

  returnStatus(){
    if(this.task().completed) return this.dialogRef.close("Entregado");
    let sub = this.task().subtasks!;
    for(let i in sub)
      if(!sub[i].completed)
        return this.dialogRef.close(sub[Number(i)-1].name);
  }

}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
