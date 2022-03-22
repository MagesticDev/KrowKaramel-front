import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import uploadIcon from './icons/bars-solid.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
export default class OffCanvas extends Plugin {
    init() { 
        const editor = this.editor;
        editor.ui.componentFactory.add('offCanvas', locale => {
            const view = new ButtonView(locale);
            view.set({
              label: 'Pannel',
              icon: uploadIcon,
              tooltip: true
            });
      
            // Callback executed once the icon is clicked
            view.on('execute', () => {
               // fire a JS event
               window.dispatchEvent(new Event('openCanvas'));
            });
      
            return view;
        });
    }
}