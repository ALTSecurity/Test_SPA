import { NgModule } from '@angular/core';

import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { DataTablesModule } from 'angular-datatables';

import { FilesComponent } from 'src/app/files/files.component';
import { AppComponent } from 'src/app/app.component';

import { ScriptsService } from 'src/app/utils/scripts.service';
import { MaskService } from 'src/app/utils/mask.service';

const routes: Routes = [
    { path: '', component: FilesComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), NgxLoadingModule.forRoot({}), DataTablesModule],
    declarations: [AppComponent, FilesComponent],
    providers: [Title, ScriptsService, MaskService],
    bootstrap: [AppComponent]
})
export class AppModule {}