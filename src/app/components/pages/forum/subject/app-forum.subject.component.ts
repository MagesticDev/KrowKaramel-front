import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild, ViewEncapsulation, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IResponses } from 'src/app/core/models/forum/reponses.model';
import { ISubject } from 'src/app/core/models/forum/subject.model';
import { ForumService } from 'src/app/core/services/forum.service';


@Component({
    templateUrl: './app-forum-subject.component.html',
    styleUrls: ['../app-forum.component.scss', './app-forum-subject.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ForumSubjectComponent implements OnInit, AfterViewInit {
    public subject: ISubject;
    public responses: IResponses[];
    public hasLoading = true;
    public editForm: FormGroup;
    public idSubject;
    public visible: boolean = false
    
    @ViewChildren("postDiv") postDivs: QueryList<ElementRef>;
    

    constructor(private forumService: ForumService, private route: ActivatedRoute, private fb: FormBuilder, private sanitizer: DomSanitizer){}  
    ngOnInit() {
        this.idSubject = this.route.snapshot.paramMap.get('idSubject');
        if(this.idSubject!= null){
            this.forumService.getSubject(Number(this.idSubject)).subscribe(subject => {
                this.subject = subject;
                this.responses = subject.responses;
                this.hasLoading = false;

                this.editForm = this.fb.group({
                    text: [null, [Validators.required, Validators.minLength(10)]],
                });
            });
        }
    }

    ngAfterViewInit() {
        this.postDivs.changes.subscribe(() => {
            this.scroll();
        });
    }


    scroll(){
        this.visible = true;
        if (this.postDivs && this.postDivs.last) {
            this.postDivs.last.nativeElement.focus();
        }
    }

    edit(editForm){
        this.forumService.response(this.idSubject , editForm.value.text, this.subject.closed, this.subject.id).subscribe(result => {
            this.responses = result.responses;
        });
    }

    editChange(event){
        this.editForm.get('text').setValue(event);
    }


    scrollToElement($element): void {
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    removeBackslashes(content) {
        const str = content.replace(/\\/g, '');
        return this.sanitizer.bypassSecurityTrustHtml(str);
    }
}