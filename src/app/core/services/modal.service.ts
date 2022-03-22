import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/app-confirmation-dialog/app-confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private ngbModal: NgbModal) { }
    confirm(
        title = 'Confirm',
        prompt = 'Really?', 
        information = null,
        informationDanger = null,
    ): Observable<boolean> {
        const modal = this.ngbModal.open(
            ConfirmDialogComponent, { backdrop: 'static' });

        modal.componentInstance.title = title;
        modal.componentInstance.prompt = prompt;
        modal.componentInstance.information = information;
        modal.componentInstance.informationDanger = informationDanger;
        

        return from(modal.result).pipe(
            catchError(error => {
                return of(undefined);
            })
        );
    }
}