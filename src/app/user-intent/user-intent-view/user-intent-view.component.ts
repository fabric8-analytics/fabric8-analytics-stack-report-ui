import { Component,Input, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
    selector: 'f8-user-intent-view',
    templateUrl: './user-intent-view.component.html',
    styleUrls: ['./user-intent-view.component.scss']
})

export class UserIntentViewComponent implements OnInit {
    @Input() gatewayConfig;

    public masterTagList:any;
    public modelContent:any = {};
    public addedTags:any;

    constructor(private route: Router) {
        window.onhashchange = () => {
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
       this.masterTagList = [{display: 'vertx', value: 0}, 'io', 'web','spring-boot','test','framework'];
       this.modelContent["artifactId"] = "spring-boot-starter-web";
       this.modelContent["groupId"] = "org.springframework.boot";
       this.modelContent["name"] = "org.springframework.boot:spring-boot-starter-web";
       this.addedTags = ['web'];
    }
    

    ngOnInit(): void {
        this.onAppLoad();
    }

    addTagComponent(): void {
        console.log("selected"+ this.addedTags);
        this.moveStackReport();
    }

    moveStackReport(): void {
        let api_data: any = {};
        if(this.gatewayConfig){
            api_data["access_token"] = this.gatewayConfig.access_token;
            api_data["route_config"] = this.gatewayConfig.config;
            let api_param = this.gatewayConfig.stack_id +"?"+ JSON.stringify(api_data);
            console.log("move to stack report!!"+ api_param);
            this.route.navigate(['/analyze/' + this.gatewayConfig.stack_id] ,{ queryParams: {api_data: JSON.stringify(api_data) }});
        }
    }

}
