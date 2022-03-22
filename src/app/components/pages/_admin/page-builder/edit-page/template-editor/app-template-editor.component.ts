import { Component } from "@angular/core";

@Component({
    selector: "app-template-editor",
    templateUrl: './app-template-editor.component.html',
    styleUrls: ['./app-template-editor.component.scss']
})
export class AppTemplateEditorComponent {
    public columns = ['id', 'label', 'Actions'];
    public filterColumns = ['id', 'label', 'actions'];
}