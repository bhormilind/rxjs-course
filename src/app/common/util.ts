import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string): Observable<Course[]> {

  return new Observable( subscriber => {

    const controller = new AbortController();

    const signal = controller.signal;

    fetch(url, {signal})
    .then( res => { return res.json()})
    .then(body => {
      subscriber.next(body);

      subscriber.complete();
    })
    .catch( err => {
      subscriber.error(err);
    });

    return () => controller.abort();
  });
}


