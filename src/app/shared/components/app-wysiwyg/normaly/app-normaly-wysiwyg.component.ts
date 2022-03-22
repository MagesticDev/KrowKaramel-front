import { Component } from "@angular/core";
import * as ClassicEditor from '../../../../core/ckeditor/build/ckeditor';
import { URL_API } from "src/app/core/const/api.constants";
import { wysiwyg } from "src/app/core/abstracts-class/_global/wysiwyg.class";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-normaly-wysiwyg',
  templateUrl: './app-normaly-wysiwyg.component.html',
  styleUrls: ['./app-normaly-wysiwyg.component.scss']
})


export class AppNormalyWysiwygComponent extends wysiwyg {

  public editor = ClassicEditor;
  
  constructor(protected sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  public config = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'youtube',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
      ]
    },
    colorButton_colors: 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    //extraPlugins: 'uploadimage',
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'fr',
    ckfinder: { uploadUrl: URL_API + '/api/forum/upload' }
  };
}

