import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    // selector: 'ngbd-modal-confirm-autofocus',
    templateUrl: './app-confirmation-dialog.component.html',
    styleUrls: ['./app-confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
    title: string;
    prompt: string;
    information: string;
    informationDanger: string;
    constructor(public activeModal: NgbActiveModal) { }
}