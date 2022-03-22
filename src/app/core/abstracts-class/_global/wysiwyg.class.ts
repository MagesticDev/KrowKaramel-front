import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";

@Directive()
export abstract class wysiwyg {
    @Output() public wysiwyg = new EventEmitter();
    @Input() content;
        
    public hasContentHtml: string;
    public ready = false;


    constructor(protected sanitizer) {   }

    wysiwygChange({ editor }: ChangeEvent) {
        if (editor) {
            let edit = editor.getData().replace(/ck-widget|ck-editor__editable|ck-editor__nested-editable|contenteditable="true"/g, '');
            const EditorData = edit;
            this.wysiwyg.emit(EditorData);
        }
    }
}