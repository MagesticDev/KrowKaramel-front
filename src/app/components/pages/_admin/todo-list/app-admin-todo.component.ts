import { Component, OnInit, ViewChild } from '@angular/core';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, SortOrderBy, SortDirection } from '@syncfusion/ej2-angular-kanban';
import { ITasksStatus } from 'src/app/core/models/todo/tasksStatus.model';
import { TasksStatusService } from 'src/app/core/services/todo/tasks-status.service';
import { L10n } from '@syncfusion/ej2-base';
import { ListsService } from 'src/app/core/services/lists.service';
import { IListAdmin } from 'src/app/core/models/lists.model';
import { ITasksPriority } from 'src/app/core/models/todo/tasksPriority.model';
import { TasksPriorityService } from 'src/app/core/services/todo/tasks-priority.service';
import { TasksService } from 'src/app/core/services/todo/tasks.service';
import { ITasks } from 'src/app/core/models/todo/tasks.model';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

L10n.load({
  'fr': {
    'kanban': {
      'items': 'éléments',
      'min': 'Min',
      'max': 'Max',
      'cardsSelected': 'Cartes sélectionnées',
      'addTitle': 'Ajouter une nouvelle carte',
      'editTitle': 'Modifier les détails de la carte',
      'deleteTitle': 'Effacer la carte',
      'deleteContent': 'Voulez-vous vraiment supprimer cette carte ?',
      'save': 'sauvegarder',
      'delete': 'supprimer',
      'cancel': 'annuler',
      'yes': 'Oui',
      'no': 'Non',
      'close': 'Fermer',
      'noCard': 'Aucune carte à afficher',
      'unassigned': 'non alloué'
    }
  }
});



@Component({
  templateUrl: './app-admin-todo.component.html',
  styleUrls: ['./app-admin-todo.component.scss'],
  selector: 'app-todo'
})

export class AdminTodoComponent implements OnInit {

  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;

  public fieldsStatus: Object = { text: 'headerText', value: 'field' };
  public fieldsAssignee: Object = { text: 'Assignee', value: 'Assignee' };
  public fieldsPriority: Object = { text: 'label', value: 'priority' };


  public headerdata: ITasksStatus[];
  public adminList: IListAdmin[];
  public tasksPriority: ITasksPriority[];
  public tasks: ITasks[];
  public addColor = null;

  public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee', allowDragAndDrop: true };

  public cardSettings: CardSettingsModel = {
    headerField: 'Id'
  };

  public sortSettings = {
    sortBy: "Index",
    field: "RankId"
  };

  constructor(
    private tasksStatusService: TasksStatusService,
    private listsService: ListsService,
    private tasksPriorityService: TasksPriorityService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.tasksStatusService.getTasksStatus().subscribe(result => {
      this.headerdata = result;
      this.tasksService.getTasksList().subscribe(tasksList => this.tasks = tasksList);
      this.listsService.getAdminList().subscribe(list => this.adminList = list);
      this.tasksPriorityService.getTasksPriority().subscribe(priority => this.tasksPriority = priority);
    });
  }

  onActionComplete(args: any) {
    
    if(args.requestType === "cardCreated") {
      let task: ITasks = args.addedRecords[0];
      const user = this.adminList.filter(item => task.Assignee.toUpperCase() === item.Assignee.toUpperCase());
      task.UID = user[0].UID;
      this.tasksService.addTask(task).subscribe();
    }

    if (args.requestType === "cardChanged") {
      let task: ITasks = args.changedRecords[0];
      const user = this.adminList.filter(item => task.Assignee.toUpperCase() === item.Assignee.toUpperCase());
      task.UID = user[0].UID;
      this.tasksService.updateTask(task).subscribe(val => {
        this.tasks = val;
      });
    }
  }

  public getBackground(args) {
    let color = this.headerdata.filter(item => item.field === args);
    return color[0].customBackground;
  }

  //sort 
  @ViewChild('sortBy') sortByObj: DropDownListComponent;
  @ViewChild('field') fieldObj: DropDownListComponent;
  @ViewChild('direction') directionObj: DropDownListComponent

  public sortByData: Object[] = [
    { Id: 'DataSourceOrder', Sort: 'Data Source Order' },
    { Id: 'Index', Sort: 'Index' },
    { Id: 'Custom', Sort: 'Custom' }
  ];

  public fields: Object = { text: 'Sort', value: 'Id' };
  public fieldData: string[] = ['None'];
  public directionData: string[] = ['Ascending', 'Descending'];
  change(args: ChangeEventArgs): void {
    if (args.value === 'DataSourceOrder' || args.value === 'Index') {
      const data: string = args.value === 'Index' ? 'RankId' : 'None';
      this.setFieldValue(data);
    }
    if (args.value === 'Custom') {
      this.fieldObj.dataSource = ['Priority', 'RankId', 'Summary'];
      this.fieldObj.value = 'Priority';
      this.fieldObj.enabled = true;
    }
  }
  setFieldValue(data: string): void {
    this.fieldObj.dataSource = [data];
    this.fieldObj.value = data;
    this.fieldObj.enabled = false;
  }
  sortClick(): void {
    this.setKanbanProperties();
  }
  clearClick(): void {
    this.sortByObj.value = 'Index';
    this.directionObj.value = 'Ascending';
    this.setFieldValue('None');
    this.setKanbanProperties();
  }
  setKanbanProperties() {
    this.kanbanObj.sortSettings.sortBy = this.sortByObj.value as SortOrderBy;
    this.kanbanObj.sortSettings.field = this.fieldObj.value as string;
    this.kanbanObj.sortSettings.direction = this.directionObj.value as SortDirection;
  }

  //addNewCard
  addClick(): void {
    const cardIds = this.kanbanObj.kanbanData.map((obj: { [key: string]: string }) => parseInt(obj.Id.replace('Task ', ''), 10));
    const cardCount: number = Math.max.apply(Math, cardIds) + 1;
    const cardDetails = {
      Id: cardCount, Status: '', Priority: '',
      Assignee: '', Estimate: 0, Tags: '', Summary: ''
    };
    this.kanbanObj.openDialog('Add', cardDetails);
  }

}


