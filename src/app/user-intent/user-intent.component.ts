import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'f8-user-intent',
    templateUrl: './user-intent.component.html',
    styleUrls: ['./user-intent.component.scss']
})

export class UserIntentComponent implements OnInit {
    public stackUrl: string;
    public apiData: any;
    public routerLink: string;

    constructor(private route: ActivatedRoute) {
        window.onhashchange = () => {
            let url: string = location.hash;
            let id: string = url.replace('#/user-intent/', '');
            let splitParams: Array<string> = id.split('?');
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
        debugger;
        let url: string = location.hash;
        let id: string = url.replace('#/user-intent/', '');
        let splitParams: Array<string> = id.split('?');
        if (splitParams && splitParams.length > 1) {
            this.apiData = decodeURIComponent(splitParams[1].split('api_data=')[1]);
            try {
                debugger;
                this.apiData = JSON.parse(this.apiData);
            } catch (err) {
                console.log('Error parsing JSON');
            }
            if (this.apiData) {
                //todo: function to be called
            }
        }
    }
    

    ngOnInit(): void {
        this.onAppLoad();
    }


}
