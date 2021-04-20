import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

      const http$: Observable<Course[]> = createHttpObservable('/api/courses').pipe(
        map(res => Object.values(res['payload'])),
        shareReplay<Course[]>()
      );



      this.beginnerCourses$ = http$.pipe(
       map(res => res.filter( data => data.category === 'BEGINNER'))
      )


      this.advancedCourses$ = http$.pipe(
        map(res => res.filter(data => data.category === 'ADVANCED'))
      )
    }

}
