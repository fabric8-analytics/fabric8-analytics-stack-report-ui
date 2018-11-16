/** Vendor imports Go HERE */
import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
/** Vendor imports Go HERE */

@Component({
    selector: 'no-data',
    styleUrls: ['./no-data.component.less'],
    templateUrl: './no-data.component.html'
})
export class NoDataComponent implements OnChanges {
    @Input() identifier: string;

    public title: string = '';
    public description: string = '';

    private TITLE_AND_DESCRIPTION: any = {
        'security': {
            title: 'No security issues',
            description: 'Dependency Analytics has not identified any security issues affecting the dependencies of this stack.'
        },
        'comp-direct-security': {
            title: 'No security issues',
            description: 'Dependency Analytics has not identified any security issues affecting the direct dependencies of this stack.'
        },
        'comp-trans-security': {
            title: 'No security issues',
            description: 'Dependency Analytics has not identified any security issues affecting the transitive dependencies of this stack.'
        },
        'ins-usage': {
            title: 'No usage outliers',
            description: 'Dependency Analytics has not identified any usage outliers and has no suggestions for alternate dependencies for this stack.'
        },
        'lic-conflicts': {
            title: 'No license conflicts',
            description: 'Dependency Analytics could not find any conflicting licences in this stack.'
        },
        'comp-analyzed': {
            title: 'No analyzed dependencies',
            description: 'Dependency Analytics was unable to analyze any dependencies for this stack.'
        },
        'ins-companion': {
            title: 'No companion dependencies',
            description: 'Dependency Analytics has no suggestions for companion dependencies for this stack.'
        },
        'lic-unknown': {
            title: 'No unknown licenses',
            description: 'Dependency Analytics could not find any unknown licences in this stack.'
        },
        'comp-unknown': {
            title: 'No unknown dependencies',
            description: 'Dependency Analytics has analyzed all the dependencies in this stack.'
        },
        'comp-trans-analyzed': {
            title: 'No transitive dependencies analyzed',
            description: 'Dependency Analytics was unable to analyze any transitive dependencies for this stack.'
        },
        'comp-direct-analyzed': {
            title: 'No direct dependencies analyzed',
            description: 'Dependency Analytics was unable to analyze any direct dependencies for this stack.'
        }
    };

    ngOnChanges(changes: SimpleChanges) {
        let summary: any = changes['identifier'];
        if (summary && summary['currentValue']) {
            this.identifier = <string>summary['currentValue'];
            this.paint();
        }
    }

    private paint() {
        if (this.identifier) {
            let configObject: any = this.TITLE_AND_DESCRIPTION[this.identifier];
            if (configObject) {
                this.title = configObject.title;
                this.description = configObject.description;
            }
        }
    }
}
