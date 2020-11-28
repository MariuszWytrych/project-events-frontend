import {Component, OnInit} from '@angular/core';
import {Event} from '../../model/event';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
})
export class EventsListComponent implements OnInit {
  newEventStartDate = new Date().toISOString().split('T')[0];
  newEventStartTime = '12:00';
  newEvent: Event = {
    eventName: '',
    description: '',
    eventStart: '',
    street: '',
    city: '',
    zipcode: ''
  };


  eventList: Event[] = [];
  const;
  urlServer = 'http://localhost:8080/events';


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Event[]>(this.urlServer)
      .subscribe(events => {
        events.forEach(event => event.eventStart = event.eventStart.replace('T', ' '));
        this.eventList = events;
      });
  }

  addNewEvent(): void {
    this.newEvent.eventStart = this.newEventStartDate + 'T' + this.newEventStartTime + ':00';
    this.httpClient.post<Event>(this.urlServer, this.newEvent)
      .subscribe(event => this.eventList.push(event));
  }
}
