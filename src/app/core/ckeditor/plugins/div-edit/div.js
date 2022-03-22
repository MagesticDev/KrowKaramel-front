import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from "ckeditor5/src/widget";
export default class DivEdit extends Plugin {

    static get _schemaName() {
        return 'div';
    }

    static get _schemaDefinition() {
        return {
            inheritAllFrom: ['$text', '$block'],
            isLimit: true,
            allowAttributes: ['style', 'class', 'id', 'columns'],
            isBlock: true,
            allowWhere: '$block',
            allowContentOf: '$root',
            // inheritAllFrom: '$block' 
        };
    }

    init() {

        const EDITOR = this.editor;

        EDITOR.model.schema.register(DivEdit._schemaName, DivEdit._schemaDefinition);
        EDITOR.model.schema.extend('$block', { allowIn: DivEdit._schemaName });

        EDITOR.conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: ['row', 'ms-0', 'me-0', 'ps-0', 'pe-0']
            },
            model: (viewElement, { writer: modelWriter }) => {
                // if(viewElement.getAttributes() === 'columns') {
                    return modelWriter.createElement('div', viewElement.getAttributes());
                // }
            },
        });

        EDITOR.conversion.for('dataDowncast').elementToElement({
            model: DivEdit._schemaName,
            view: (modelElement, { writer: viewWriter }) => {
                // if(modelElement.getAttributes() === 'columns') {
                    return viewWriter.createContainerElement('div', { class: 'row ms-0 me-0 ps-0 pe-0' });
                // }
            }
        });

        EDITOR.conversion.for('editingDowncast').elementToElement(
            {
                model: DivEdit._schemaName,
                view: (modelElement, { writer: viewWriter }) => {
                    // if(modelElement.getAttributes() === 'columns') {
                        const view = viewWriter.createEditableElement('div', { class: 'row ms-0 me-0 ps-0 pe-0' });
                        return toWidget(view, viewWriter);
                    // }
                }
            }
        );

        EDITOR.conversion.for('downcast').add(dispatcher => {
            dispatcher.on('attribute', (evt, data, conversionApi) => {
                // if(data.attributeKey === 'columns'){
                    // // Convert <div> attributes only.
                    if (data.item.name != 'div') {
                        return;
                    }
                    const viewWriter = conversionApi.writer;
                    const viewDiv = conversionApi.mapper.toViewElement(data.item);

                    if (data.attributeNewValue) {
                        viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, viewDiv);
                        toWidget(viewDiv, viewWriter); 
                        toWidgetEditable(viewDiv, viewWriter);
                    } else {
                        viewWriter.removeAttribute(data.attributeKey, viewDiv);
                    }
                // }
            });
        });   


        EDITOR.conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                class: 'col-sm'
            },
            model: (viewElement, { writer: modelWriter }) => {
                // if(viewElement.getAttributes() !== 'columns') {
                    return modelWriter.createElement('div', viewElement.getAttributes());
                // }
            },
        });


        EDITOR.conversion.for('dataDowncast').elementToElement(
            {
                model: DivEdit._schemaName,
                view: (modelElement, { writer: viewWriter }) => {
                    // if(modelElement.getAttributes() !== 'columns') {
                        viewWriter.createContainerElement('div', { class: 'col-sm' });
                    // }
                }
            }
        );

        EDITOR.conversion.for('editingDowncast').elementToElement(
            {
                model: DivEdit._schemaName,
                view: (modelElement, { writer: viewWriter }) => {
                    // if(modelElement.getAttributes() !== 'columns') {
                        const view = viewWriter.createEditableElement('div', { class: 'col-sm' });
                        return toWidgetEditable(view, viewWriter);
                    // }
                }
            }
        );

        EDITOR.conversion.for('downcast').add(dispatcher => {
            dispatcher.on('attribute', (evt, data, conversionApi) => {
                // if(data.attributeKey !== 'columns'){
                    // // Convert <div> attributes only.
                    if (data.item.name != 'div') {
                        return;
                    }
                    const viewWriter = conversionApi.writer;
                    const viewDiv = conversionApi.mapper.toViewElement(data.item);

                    if (data.attributeNewValue) {
                        viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, viewDiv);
                        toWidget(viewDiv, viewWriter); 
                        toWidgetEditable(viewDiv, viewWriter);
                    } else {
                        viewWriter.removeAttribute(data.attributeKey, viewDiv);
                    }
                // }
            });
        });   
    }
}

// export function dispatcher(editor, hasColumn = false, view, viewWriter) {
//     editor.conversion.for('downcast').add(dispatcher => {
//         dispatcher.on('attribute', (evt, data, conversionApi) => {
//             // Convert <div> attributes only.
//             if (data.item.name != 'div') {
//                 return;
//             }

//             const viewDiv = conversionApi.mapper.toViewElement(data.item);
//             if (data.attributeNewValue) {
//                 viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, viewDiv);
//                 return [toWidget(view, viewWriter), toWidgetEditable(view, viewWriter)];
//             } else {
//                 viewWriter.removeAttribute(data.attributeKey, viewDiv);
//             }
//         });
//     });        
// }