/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function filterResponse<T>() {
  return pipe(
    filter((event: HttpResponse<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>(cb: (proress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      if (event.loaded / event.total <= 0.9) {
        cb(Math.round(event.loaded / event.total));
      }
    } else {
      cb(0.9);
    }
  });
}
