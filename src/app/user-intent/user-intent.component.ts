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
    public tokenApi: string;
    public routerLink: string;

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe((params) => {
            this.tokenApi = params.get('token');
        });
        window.onhashchange = () => {
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
        if(this.tokenApi){
            console.log(this.tokenApi);
        }
    }
    

    ngOnInit(): void {
        this.onAppLoad();
    }


}
