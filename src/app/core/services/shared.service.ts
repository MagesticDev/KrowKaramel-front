import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    private inputChangeSource = new EventEmitter<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    onGetData$ = this.inputChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);   
    }

    inputData(change: any) {
        this.inputChangeSource.next(change);
    }
}