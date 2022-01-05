import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from 'src/app/core/services/auth.service';
import {ClassroomService} from 'src/app/core/services/classroom.service';

declare const $: any;

@Component({
  selector: 'app-view-history-modal',
  templateUrl: './view-history-modal.component.html',
  styleUrls: ['./view-history-modal.component.scss']
})
export class ViewHistoryModalComponent implements OnInit {
  @Input() events: Observable<any>;
  public classroomName;
  public tableData = []
  public users;
  private eventsSubscription: Subscription = new Subscription();

  constructor(
    private classroomService: ClassroomService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.classroomName = data.classroomName;
      this.getHistory(data.id);
      this.showModal();
    });
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public getHistory(id) {
    this.tableData = [];
    this.classroomService.getClassroomHistory(id).subscribe(data => {
      data.forEach(historyData => {
        historyData.start = new Date(historyData.start);
        historyData.finish = new Date(historyData.finish);
        var differenceTravel = historyData.finish.getTime() - historyData.start.getTime();

        historyData.estimat_rezervare = ((differenceTravel) / 1000) / 60;

        this.users.forEach(user => {
          if (user.id == historyData.id_user) {
            historyData.userName = user.nume + ' ' + user.prenume;
          }
        })
        this.tableData.push(historyData);
      })
    })
  }

  public showModal(): void {
    $('#viewHistoryModal').modal('show');
  }

  public hideModal(): void {
    $('#viewHistoryModal').modal('hide');
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

}
