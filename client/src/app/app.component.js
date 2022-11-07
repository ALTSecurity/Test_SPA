var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(titleService, activeRoute, scriptsService, maskService) {
        this.titleService = titleService;
        this.activeRoute = activeRoute;
        this.scriptsService = scriptsService;
        this.maskService = maskService;
        //Тайтл текущего компонента
        this.title = '';
        this.currYear = new Date().getFullYear();
        if (this.titleService.getTitle() === '' && this.activeRoute.snapshot.url.length === 0) {
            this.setDocTitle('Аналіз файлів');
        }
    }
    setDocTitle(title) {
        this.title = 'ALTSecurity - ' + title;
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
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: 'app.component.html'
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map