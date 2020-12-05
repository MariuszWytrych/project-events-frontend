import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from '../../service/globals.service';
import {Event} from '../../model/event';
import {Comment} from '../../model/comment';
import {ActivatedRoute, Router} from '@angular/router';
import {InvitePerson} from '../../model/invite-person';

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
  invitePerson: InvitePerson = {
    email: ''
  };
  comment: Comment = {
    username: '',
    eventId: 0,
    content: ''
  };
  comments: Comment[] = [];


  constructor(private globals: GlobalsService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.loadEvent();
  }
  private loadComments(): void {
    const id = this.activatedRoute
      .snapshot
      .params.id;
    this.httpClient.get<Comment[]>(this.globals.apiUrl + '/comment' + '/' + id + '/comments')
      .subscribe(comments => {
        this.comments = comments;
        console.log(comments);
      });
  }

  private loadEvent(): void {
    const id = this.activatedRoute
      .snapshot
      .params.id;
    this.httpClient.get<Event>(this.globals.apiUrl + '/events/' + id)
      .subscribe(event => {
        event.eventStart = event.eventStart.replace('T', ' ');
        this.eventById = event;
      });
    this.loadComments();
  }

  invite(): void {
    // this.httpClient.post<InvitePerson>(this.globals.apiUrl + '/events/invitation/send', this.invited)
    //   .subscribe();
    console.log('Wysyłam zaprosznie');
  }


  addNewComment(): void {
    const id = this.activatedRoute
      .snapshot
      .params.id;
    this.comment.eventId = id;
    this.httpClient.post(this.globals.apiUrl + '/comment', this.comment)
      .subscribe(() => this.loadComments());
  }
}
