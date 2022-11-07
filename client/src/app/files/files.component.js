var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let FilesComponent = class FilesComponent {
    constructor(modalService, maskService) {
        this.modalService = modalService;
        this.maskService = maskService;
        this.data = [];
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 25],
            processing: true
        };
    }
    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            console.log(result);
        }, () => { });
    }
};
FilesComponent = __decorate([
    Component({
        selector: 'app-files',
        templateUrl: 'files.component.html'
    })
], FilesComponent);
export { FilesComponent };
//# sourceMappingURL=files.component.js.map