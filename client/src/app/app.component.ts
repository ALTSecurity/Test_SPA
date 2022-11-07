import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ScriptsService } from 'src/app/utils/scripts.service';
import { MaskService } from 'src/app/utils/mask.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    //Тайтл текущего компонента
    title: string = '';
    currYear: number = new Date().getFullYear();

    constructor(private titleService: Title,
        private activeRoute: ActivatedRoute,
        private scriptsService: ScriptsService,
        private maskService: MaskService) {
        if (this.titleService.getTitle() === '' && this.activeRoute.snapshot.url.length === 0) {
            this.setDocTitle('Аналіз файлів');
        }
    }

    setDocTitle(title: string) {
        this.title = 'ALTSecurity - ' +  title;
        this.titleService.setTitle(this.title);
    }

    getMaskState() {
        return this.maskService.loading;
    }

    ngOnInit() {
        //Динамическая загрузка скрипта темы после инициализации компонента
        this.maskService.show();
        this.scriptsService.load(['sb-admin']).then(() => { this.maskService.hide(); });
    }
}