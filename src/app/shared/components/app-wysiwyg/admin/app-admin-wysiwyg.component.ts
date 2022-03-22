import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import * as ClassicEditor from '../../../../core/ckeditor/build/ckeditor';
import { wysiwyg } from 'src/app/core/abstracts-class/_global/wysiwyg.class';
import { URL_API } from "src/app/core/const/api.constants";
import { DomSanitizer } from '@angular/platform-browser';
declare const bootstrap: any;


@Component({
  selector: 'app-admin-wysiwyg',
  templateUrl: './app-admin-wysiwyg.component.html',
  styleUrls: ['../normaly/app-normaly-wysiwyg.component.scss', './app-admin-wysiwyg.component.scss'],
})

export class AppAdminWysiwygComponent extends wysiwyg {


  public editor = ClassicEditor;
  public fontColor = require('../utils/font-color.json');
  public fontBackgroundColor = require('../utils/font-background-color.json');

  @HostListener('window: openCanvas', ['$event'])

  openCustomPopup(event) {
    var myOffcanvas = document.getElementById('offCanvasEditor') 
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
    bsOffcanvas.show()
  }


  @Output() hasValid = new EventEmitter<boolean>();

  constructor(protected sanitizer: DomSanitizer) {
    super(sanitizer);
  }


  public config = {
    placeholder: 'Editer votre page',
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'horizontalLine',
        'underline',
        'removeFormat',
        'link',
        'strikethrough',
        'specialCharacters',
        'highlight',
        'restrictedEditingException',
        '|',
        'todoList',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'imageUpload',
        'imageInsert',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        '|',
        'fontFamily',
        'fontSize',
        'letterCase',
        '|',
        'fontBackgroundColor',
        'fontColor',
        '|',
        'pageBreak',
        '|',
        'FindReplace',
        '|',
        'Layout',
        'offCanvas'
      ],
      shouldNotGroupWhenFull: true
    },
    restrictedEditing: {
      allowedCommands: ['bold']
    },
    fontColor: {
      columns: 9,
      colors: this.fontColor,
    },
    fontBackgroundColor: {
      columns: 9,
      colors: this.fontBackgroundColor,
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Titre H1 Très important', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Titre H2 Moin important que h1 ', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Titre H3 Moin important que h2 ', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Titre H4 Moin important que h3 ', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Titre H5 Moin important que h4 ', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Titre H6 Moin important que h5 ', class: 'ck-heading_heading6' },
      ],
    },

    removePlugins: ['Autoformat'],
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    //extraPlugins: 'uploadimage',
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'fr',
    ckfinder: { uploadUrl: URL_API + '/api/forum/upload' }
  };
}