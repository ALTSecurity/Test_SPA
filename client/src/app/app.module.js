var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { DataTablesModule } from 'angular-datatables';
import { FilesComponent } from 'src/app/files/files.component';
import { AppComponent } from 'src/app/app.component';
import { ScriptsService } from 'src/app/utils/scripts.service';
import { MaskService } from 'src/app/utils/mask.service';
const routes = [
    { path: '', component: FilesComponent }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), NgxLoadingModule.forRoot({}), DataTablesModule],
        declarations: [AppComponent, FilesComponent],
        providers: [Title, ScriptsService, MaskService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map