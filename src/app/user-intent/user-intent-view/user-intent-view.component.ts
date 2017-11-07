import { Component,Input, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'f8-user-intent-view',
    templateUrl: './user-intent-view.component.html',
    styleUrls: ['./user-intent-view.component.scss']
})

export class UserIntentViewComponent implements OnInit {
    @Input() gatewayConfig;

    public masterTagList:any;
    public modelContent:any = {};
    public model:any = 1;
    public addedTags:any;

    constructor(private route: ActivatedRoute) {
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
        debugger
        console.log("selected"+ this.addedTags);
    }

}
