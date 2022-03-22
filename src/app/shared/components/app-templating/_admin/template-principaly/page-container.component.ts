import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, Injectable, ContentChild, Input } from '@angular/core';

@Component({
    selector: 'app-page-admin-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class PageAdminContainerComponent implements OnInit {

    // private initialized = false;
    // private contentTemplates: Array<TemplateRef<any>> = []; 
    // private contentContainer: ViewContainerRef;
    
   
    // // @ViewChild(PageAdminContainerContentDirective, {static: true, read: ViewContainerRef}) target: ViewContainerRef;
    // @ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef

    constructor() { }
    ngOnInit() {}

    // addContentTemplate(template: TemplateRef<any>, contentContainer: ViewContainerRef) {
    //     // console.log(('contentContainer', this.myRef);
    //     this.contentContainer = contentContainer;
    //     this.addTemplate(template, this.contentTemplates, contentContainer);
    // }

    // removeContentTemplate() {
    //     this.removeTemplate(this.contentTemplates, this.contentContainer);
    // }

    // private addTemplate(template: TemplateRef<any>, stack: Array<TemplateRef<any>>, container: ViewContainerRef) {
    //     stack.push(template);
    //     this.renderContainer(stack, container);
    // }
    // private removeTemplate(stack: Array<TemplateRef<any>>, container: ViewContainerRef) {
    //     stack.pop();
    //     this.renderContainer(stack, container);
    // }

    // private renderContainer(stack: Array<TemplateRef<any>>, container: ViewContainerRef) {
    //     container.clear();
    //     const view = container.createEmbeddedView(stack[stack.length - 1]);
    //     view.detectChanges();
    // }
}
