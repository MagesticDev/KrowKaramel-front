import { Directive } from '@angular/core';

@Directive()
export abstract class uploadIcons {
    public icons = ['pdf', 'exe', 'svg', 'psd', 'ai', 'docx', 'doc', 'docm', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp', 'gif'];
    constructor(protected iconRegistry, protected sanitizer) {

        const doc = ['docx', 'doc', 'docm'];
        doc.forEach(name => {
            iconRegistry.addSvgIcon(name, sanitizer.bypassSecurityTrustResourceUrl('assets/icons/doc.svg'));
        });

        const img = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp'];
        img.forEach(name => {
            iconRegistry.addSvgIcon(name, sanitizer.bypassSecurityTrustResourceUrl('assets/icons/img.svg'));
        });

        iconRegistry.addSvgIcon('gif', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gif.svg'));
        iconRegistry.addSvgIcon('pdf', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pdf.svg'));
        iconRegistry.addSvgIcon('exe', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/exe.svg'));
        iconRegistry.addSvgIcon('svg', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg.svg'));
        iconRegistry.addSvgIcon('psd', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/psd.svg'));
        iconRegistry.addSvgIcon('ai', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ai.svg'));
        iconRegistry.addSvgIcon('file', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file.svg'));
    }

    getFindIcon(icons, ext){
        const filter = icons.filter(item => item === ext);
        if(filter.length > 0) {
            return filter;
        } else {
            return 'file';
        }
    }
}