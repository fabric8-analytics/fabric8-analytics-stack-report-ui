import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'f8-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    public stackUrl: string;
    public apiData: any;
    public gateway: any = {};
    public label: string;
    public routerLink: string;

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe((params) => {
            this.label = params.get('id');
        });
        window.onhashchange = () => {
            let url: string = location.hash;
            let id: string = url.replace('#/analyze/', '');
            let splitParams: Array<string> = id.split('?');
            this.label = splitParams[0];
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
        let url: string = location.hash;
        let id: string = url.replace('#/analyze/', '');
        let splitParams: Array<string> = id.split('?');
        if (splitParams && splitParams.length > 1) {
            this.apiData = decodeURIComponent(splitParams[1].split('api_data=')[1]);
            try {
                this.apiData = JSON.parse(this.apiData);
            } catch (err) {
                console.log('Error parsing JSON');
            }
            if (this.apiData) {
                this.changeLabel();
            }
        }
    }
    changeLabel(): void {
        console.log(this.label);
        if (this.label && this.label.trim() !== '') {
            this.routerLink = '/analyze/' + this.label;
            // this.gateway['user_key'] = this.apiData['user_key'];
            this.gateway['access_token'] = this.apiData['access_token'];
            this.stackUrl = 'https://recommender.api.openshift.io/api/v1/stack-analyses/' + this.label;
            console.log('=========================');
            console.log(this.gateway);
            console.log(this.stackUrl);
            console.log('=========================');
        }
    }

    ngOnInit(): void {
        this.onAppLoad();
    }


}
