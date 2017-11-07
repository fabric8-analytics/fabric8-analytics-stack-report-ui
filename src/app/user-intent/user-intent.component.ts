import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'f8-user-intent',
    templateUrl: './user-intent.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./user-intent.component.scss']
})

export class UserIntentComponent implements OnInit {
    public stackUrl: string;
    public apiData: any = {};
    public gateway: any = {};
    public tokenApi: string;
    public routerLink: string;

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe((params) => {
            this.tokenApi = params.get('token');
            this.apiData['access_token'] = this.tokenApi;
            this.apiData['route_config'] = {'api_url':'https://recommender.api.openshift.io/'};
            if(this.tokenApi){
                console.log(this.tokenApi);
                this.gateway['access_token'] = this.apiData['access_token'];
                this.gateway['config'] = this.apiData['route_config'];
            }
        });
        window.onhashchange = () => {
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
       
    }
    

    ngOnInit(): void {
        this.onAppLoad();
    }


}
