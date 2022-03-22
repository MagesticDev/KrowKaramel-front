import { Component, Input } from "@angular/core";
import { NgxImgZoomService } from "ngx-img-zoom";

@Component({
    selector: "app-image-magnifier",
    templateUrl: "./app-image-magnifier-popup.html",
    styleUrls: ["./app-image-magnifier-popup.scss"]
})
export class AppImageMagnifierPopupComponent {
    title = "CodeSandbox";

    //@Input() public imageInput: string;

    public _imageInput: string;

    get imageInput(): string {
        return this._imageInput;
    }

    @Input() set imageInput(value: string) {
        this._imageInput = value;
        this.getImageInput(this._imageInput);
    }

    public imagePath;
    public imgURL: any;
    public message: string;

    enableZoom: Boolean = true;
    previewImageSrc: any;
    zoomImageSrc: any;

    constructor(private ngxImgZoom: NgxImgZoomService) {
        this.ngxImgZoom.setZoomBreakPoints([
            { w: 10,  h: 10 },
            { w: 20,  h: 20 },
            { w: 30,  h: 30 },
            { w: 40,  h: 40 },
            { w: 50,  h: 50 },
            { w: 60,  h: 60 }
        ]);

        this.getImageInput(this.imageInput);
    }

    getImageInput(value){
        this.previewImageSrc = value;
        this.zoomImageSrc = value;
    }

    preview(files) {
        if (files.length === 0) return;
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            //this.imgURL = reader.result;
            this.previewImageSrc = reader.result;
            this.zoomImageSrc = reader.result;
        };
    }
}