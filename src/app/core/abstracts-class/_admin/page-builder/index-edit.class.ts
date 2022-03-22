import { Directive, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { EnumStatus } from "src/app/core/enum/formControl.enum";
import { EnumOffcanvas } from "src/app/core/enum/offcanvas.enum";

@Directive()
export abstract class indexEditPageBuilder implements OnInit {
    @Output() public editAndNewPage = new EventEmitter<boolean>();
    @ViewChild('tabs') tabs;
    public informationsOk: boolean = false;
    public editForm: FormGroup;
    protected ckText: any = null;
    public offcanvasPosition = EnumOffcanvas.RIGHT;
    
    public offcanvasConfig = {
        "position": EnumOffcanvas.RIGHT,
        "id": "offCanvasEditor",
        "title": "Options supplémentaires",
        "description": "Panel d'administration pour ajouter / editer / supprimer des nouveaux templates",
        "backdrop": false,
        "scroll": true
    }

    constructor(protected activatedRoute, protected fb, protected pagesService,  protected alertService){

    }
    
    ngOnInit() {
        this.editAndNewPage.emit(true);
        this.editForm = this.fb.group({
            text: [null, [Validators.required, Validators.minLength(10)]],
        });
    }

    validateInformations(value){
        this.informationsOk = value === EnumStatus.VALID;
    }

    editChange(event){
        this.editForm.get('text').setValue(event);
        this.editForm.markAsPristine();
    }

    edit(editForm){
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.pagesService.updatePage(editForm.value, id).subscribe(val => {
            this.alertService.success('Contenu mis à jour avec succès.');
            this.editForm.markAsDirty();
        });
    }
}