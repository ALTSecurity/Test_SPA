import { Injectable } from '@angular/core';

@Injectable()
export class MaskService {
    private _loading: boolean;

    public get loading() {
        return this._loading;
    }

    public show() {
        this._loading = true;
    }

    public hide() {
        this._loading = false;
    }
}