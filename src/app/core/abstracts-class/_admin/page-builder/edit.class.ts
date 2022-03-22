import { DatePipe } from "@angular/common";
import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EnumStatus } from "src/app/core/enum/formControl.enum";
import { IPage } from "src/app/core/models/pagesBuilder/page.model";
import { IDocumentFile } from "src/app/core/models/pagesBuilder/documents.model"
import { switchMap } from "rxjs";

@Directive()
export abstract class editPageBuilder {

    @Output()
    public validateInformations = new EventEmitter<EnumStatus.VALID>();

    public informations: FormGroup;
    public informationsCompleted = false;
    public valueUrl: string;
    public valueTitleLabel: string;
    public valueTitle: string;
    public valueDescription: string;
    public hasMenuItemActivated = 'yes';
    public rightPageAccess = 0;
    public hasDepublished = false;
    public _date: string;
    public icons;
    public isShowDivListIcons = false;
    public iconChoice: string = null;
    public documents: IDocumentFile[];

    public hasLoading = true;

    private _page: IPage;
    protected pageResult: IPage;
    public addIdEdit: boolean = false;
    public hasDocumentDeleted = false;

    get page(): IPage {
        return this._page;
    }

    @Input() set page(value: IPage) {
        if (value) {
            this._page = value;
            if (this._page) {
                this.documents = this._page.documents;
            }

            if (this.hasEdit) {
                this.updateControls(true, 'pageId', [Validators.required]);
                this.addIdEdit = true;
            }

            this.getPage();
        }

        if (!this.hasEdit) { // si aucune données on ne met pas le loader
            this.hasLoading = false;
        }
    }

    private _hasEdit: boolean;

    get hasEdit(): boolean {
        return this._hasEdit;
    }

    @Input() set hasEdit(value: boolean) {
        if (value) {
            this._hasEdit = value;
        }
    }


    constructor(protected formGroupe, protected pagesService, protected alertService, protected datepipe, protected mainService, protected activatedRoute) {
        this.getFormValue();
        this.getIconsList();
    }

    getBtn(event) {
        if (event) {
            this.informations.markAsPristine();
        } else {
            this.informations.markAsDirty();
        }
        this.validateInformations.emit(event);
    }

    toggleDisplayDivListIcons() {
        this.isShowDivListIcons = !this.isShowDivListIcons;
    }

    choiceIcon(value) {
        this.iconChoice = value;
        this.informations.controls.iconMenu.setValue(value);
        this.isShowDivListIcons = false;
    }

    getIconsList() {
        this.mainService.jtGetFontIcons().subscribe(val => {
            this.icons = val;
        })
    }

    updateControls(hasTrue, controlName, validator: Validators) {
        if (hasTrue) {
            this.informations.addControl(controlName, new FormControl('', validator));
        } else {
            this.informations.removeControl(controlName);
        }
    }

    transformUrl(value) {
        this.valueUrl = this.transform(value);
    }

    transformTitleLabel(value) {
        this.valueTitleLabel = this.transform(value);
    }

    transformTitle(value) {
        this.valueTitle = this.transform(value);
    }

    transformDescription(value) {
        this.valueDescription = this.transform(value);
    }

    transform(value: string) {
        let first = value.substr(0, 1).toUpperCase();
        return first + value.substr(1);
    }

    onPaste(value) {
        value.preventDefault();
    }

    getFiles(event) {
        if (!event.id) {
            this.informations.patchValue({
                documents: event
            });

            if (this.informations.status === EnumStatus.VALID && !this.hasDocumentDeleted) {
                this.informations.markAsTouched();
            }
        }
    }

    getFileDeleted(event) {
        if (event.id) {
            this.pagesService.deleteDocuments(this.page.page_id, event);
            this.alertService.success('Le fichier ' + event.name + ' à été supprimé avec succès.');
        } else {
            this.informations.markAsUntouched();
            this.informations.markAsPristine();  
        }
    }

    protected abstract reloadCurrentRoute(value): void

    save(form) {
        this.hasLoading = true;
        if (!this.page && !this.hasEdit) {
            this.pagesService.saveInformations(form.value).subscribe(val => {
                this.informations.disable();
                this.alertService.success('Informations de page enregistrées avec succès, vous allez être redirigé dessus dans 3 secondes.');
                this.reloadCurrentRoute(val['page_id']);
                this.hasLoading = false;
            });
        } else {
            this.hasLoading = true;
            this.pagesService.updateInformations(form.value).subscribe(page => {

                // this.page = page;
                const documents = this.informations.get('documents').value;
                this.pagesService.upload(page.page_id, documents).subscribe(documents => {
                    this.documents = documents;
                });

                this.alertService.clear();
                this.alertService.success('Informations mis à jour avec succès.');
                this.informationsCompleted = false;
                this.validateInformations.emit(EnumStatus.VALID);
                this.informations.markAsPristine();
                this.hasLoading = false;
            });
        }
    }

    getFormValue() {
        this.informations = this.formGroupe.group({
            title: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(60)]],
            description: ['', [Validators.required, Validators.minLength(160), Validators.maxLength(200)]],
            hasHeader: [true],
            documents: [''],
            url: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            hasMenuItem: [true],
            hasPublished: [''],
            rightPageAccess: [this.rightPageAccess, [Validators.required, Validators.min(0), Validators.max(2)]],
            hasDepublished: [false],
        });


        if (this.informations.get('hasMenuItem').value) {
            this.updateControls(true, 'labelMenu', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
            this.updateControls(true, 'iconMenu', [Validators.required]);
        }

        this.informations.get('hasMenuItem').valueChanges.subscribe(val => {
            this.updateControls(val, 'labelMenu', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
            this.updateControls(val, 'iconMenu', [Validators.required]);
        });

        if (this.informations.get('hasDepublished').value) {
            /* Mettre un validators pour date https://stackblitz.com/edit/angular-date-validator?embed=1&file=src/app/shared/date.validator.ts */
            this.updateControls(true, 'hasDepublishedDate', [Validators.required]);
        }

        this.informations.get('hasDepublished').valueChanges.subscribe(val => {
            /* Mettre un validators pour date https://stackblitz.com/edit/angular-date-validator?embed=1&file=src/app/shared/date.validator.ts */
            this.updateControls(val, 'hasDepublishedDate', [Validators.required]);
        });

        this.formChange();
    }

    formChange() {
        this.informations.statusChanges.subscribe(status => {
            this.informationsCompleted = status === EnumStatus.VALID;
            if (this.informations.dirty) {
                this.alertService.clear();
                status = this.informations.dirty;
                if (this.hasEdit) {
                    this.alertService.warn('Vous devez sauvegarder vos modifications afin d\'avoir la possibilité d\'accéder à l\'éditeur.');
                }
            }
            this.validateInformations.emit(status);
        })
    }

    async getPage() {
        this.hasLoading = true;
        return new Promise(async (resolve, reject) => {
            if (await this.page) {
                let result = this.page;
                if (result) {
                    setTimeout(() => {
                        this.informations.patchValue({
                            pageId: result.page_id,
                            hasHeader: result.hasHeader,
                            title: result.title,
                            description: result.description,
                            documents: result.documents,
                            rightPageAccess: (result.is_logged ? 1 : result.is_admin ? 2 : 0),
                            labelMenu: result.menu_title,
                            url: result.path,
                            hasMenuItem: result.is_add_menu,
                            hasPublished: result.is_published,
                            hasDepublished: (result.depublished_at ? true : false),
                        })

                        if (this.hasEdit) {
                            this.informations.patchValue({ pageId: result.page_id });
                        }

                        if (result.depublished_at) {
                            const birthYear = Number(this.datepipe.transform(result.depublished_at, 'yyyy'));
                            const birthMonth = Number(this.datepipe.transform(result.depublished_at, 'MM'));
                            const birthDay = Number(this.datepipe.transform(result.depublished_at, 'dd'));
                            this.informations.get('hasDepublishedDate').setValue({
                                year: birthYear,
                                month: birthMonth,
                                day: birthDay
                            });
                        }
                        if (result.icon) {
                            this.informations.patchValue({ iconMenu: result.icon });
                        }
                    })

                }
                this.hasLoading = false;
                return resolve(this.page);
                // return this.page;
            }
        })

    }
}