/** Vendor imports Go HERE */
import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
/** Vendor imports Go HERE */

import {
    MComponentInformation
} from '../../../models/ui.model';

import { GenerateUrl } from '../../../utils/url-generator';

@Component({
    selector: 'component-snippet',
    styleUrls: ['./component-snippet.component.less'],
    templateUrl: './component-snippet.component.html'
})
export class ComponentSnippetComponent implements OnInit, OnChanges {
    @Input() component: MComponentInformation;
    @Input() view: string;
    @Input() tabType: string;

    public githubEntries: Array<any> = [];

    public generateUrl = new GenerateUrl();


    public githubKeys: any = {
        contributors: 'Contributors',
        forks: 'Forks',
        depRepos: 'Dependent Repos',
        stars: 'Stars',
        usage: 'Usage'
    };

    public lastUpdatedGH: any = {
        lastUpdated: 'N/A'
    };

    public osioKeys: any = {
        usage: 'Usage'
    };

    public showOSIOUsage: boolean = false;

    ngOnInit() {
        this.paint();
    }

    ngOnChanges(changes: SimpleChanges) {
        let summary: any = changes['component'];
        if (summary) {
            this.component = <MComponentInformation>summary.currentValue;

        }
        console.log("component==>>", this.component);
        
        this.paint();
    }

    public getUrl(url: string, tabType: string, registrationStatus?: string): string {
        if (tabType == 'public') {
            return this.generateUrl.publicUrl(url);
        }
        if (tabType == 'private') {
            return this.generateUrl.privateUrl(url, registrationStatus);
        }
        if (tabType == 'compDetails') {
            return this.generateUrl.privateUrl(url, registrationStatus);
        }
    }

    private paint(): void {
        this.githubEntries = [];
        if (this.component) {
            if (this.component.github) {
                let github = this.component.github;
                let value = '';
                for (let key in github) {
                    if (key === 'users') continue;
                    if (github.hasOwnProperty(key) && key !== 'lastUpdated') {
                        value = github[key];
                        value = value && value.toString() === '-1' ? 'NA' : value;
                        this.githubEntries.push({ key: this.githubKeys[key], value: value });
                    } else if (github.hasOwnProperty(key) && key === 'lastUpdated') {
                        this.lastUpdatedGH.lastUpdated = github[key];
                    }
                }
            }
        }
    }
}
