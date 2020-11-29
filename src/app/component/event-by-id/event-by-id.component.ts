import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from '../../service/globals.service';
import {Event} from '../../model/event';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-by-id',
  templateUrl: './event-by-id.component.html'
})
export class EventByIdComponent implements OnInit {
  eventById: Event = {
    eventName: '',
    description: '',
    eventStart: '',
    street: '',
    city: '',
    zipcode: '',
    organizerName: ''
  };

  constructor(private globals: GlobalsService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  private loadEvent(): void {
    const myParam1 = this.activatedRoute
      .snapshot
      .params.myParam1;
    console.log(myParam1);
    this.httpClient.get<Event>(this.globals.apiUrl + '/events/{id}')
      .subscribe(eventById => this.eventById = eventById);
  }
}
