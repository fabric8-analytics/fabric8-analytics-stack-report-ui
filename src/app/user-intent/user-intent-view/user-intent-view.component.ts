import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'f8-user-intent-view',
    templateUrl: './user-intent-view.component.html',
    styleUrls: ['./user-intent-view.component.scss']
})

export class UserIntentViewComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
        window.onhashchange = () => {
            this.onAppLoad();
        };
    }

    onAppLoad(): void {

    }
    

    ngOnInit(): void {
        this.onAppLoad();
    }

    selectedEcosystem(ecosystem: any): void {
        console.log("selected");
    }

}
