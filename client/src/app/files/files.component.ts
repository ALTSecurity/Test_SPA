import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MaskService } from 'src/app/utils/mask.service';

@Component({
    selector: 'app-files',
    templateUrl: 'files.component.html'
})
export class FilesComponent {

    constructor(private modalService: NgbModal, private maskService: MaskService) { }

    data = [];

    dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        processing: true
    };

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            console.log(result);
        }, () => {});
    }
}