import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WIT_API_URL } from 'ngx-fabric8-wit';

import {StackReportModel} from './models/stack-report.model';

@Injectable()
export class StackAnalysesService {

  // private headers: Headers = new Headers();
  private stackAnalysesUrl: string = '';
  private cvssScale: any = {
    low: {
      start: 0.0,
      end: 3.9,
      iconClass: 'pficon pficon-warning-triangle-o',
      displayClass: 'progress-bar-warning'
    },
    medium: {
      start: 4.0,
      end: 6.9,
      iconClass: 'pficon pficon-warning-triangle-o',
      displayClass: 'progress-bar-warning'
    },
    high: {
      start: 7.0,
      end: 10.0,
      iconClass: 'pficon pficon-warning-triangle-o warning-red-color',
      displayClass: 'progress-bar-danger'
    }
  };

  constructor(
    private http: Http
  ) {}

  getStackAnalyses(url: string, params?: any): Observable<any> {
    let stackReport: StackReportModel = null;
    if (params) {
      if (params['access_token']) {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + params['access_token']);
        return this.http.get(url, {
          headers: headers
        })
        .map(this.extractData)
        .map((data) => {
          stackReport = data;
          return stackReport;
        })
        .catch(this.handleError);
      }
    }
    return null;
  }

  getCvssObj(score: number): any {
    if (score) {
      let iconClass: string = this.cvssScale.medium.iconClass;
      let displayClass: string = this.cvssScale.medium.displayClass;
      if (score >= this.cvssScale.high.start) {
        iconClass = this.cvssScale.high.iconClass;
        displayClass = this.cvssScale.high.displayClass;
      }
      return {
        iconClass: iconClass,
        displayClass: displayClass,
        value: score,
        percentScore: (score / 10 * 100)
      };
    }
  }

  private extractData(res: Response) {
    let body = res.json() || {};
    body['statusCode'] = res.status;
    body['statusText'] = res.statusText;
    return body as StackReportModel;
  }

  private handleError(error: Response | any) {
    let body: any = {};
    if (error instanceof Response) {
      if (error && error.status && error.statusText) {
        body = {
          status: error.status,
          statusText: error.statusText
        };
      }
    } else {
      body = {
        statusText: error.message ? error.message : error.toString()
      };
    }
    return Observable.throw(body);
  }

}
