import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { AuthenticationService } from 'ngx-login-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {
    constructor(private http: Http) {}

    public submit(feedback: any, params?: any): Observable<any> {
        let url: string = 'https://recommender.api.openshift.io/api/v1/user-feedback';
        if (params) {
            if (params['access_token']) {
                let headers: Headers = new Headers({'Content-Type': 'application/json'});
                headers.append('Authorization', 'Bearer ' + params['access_token']);
                return this.http
                    .post(url, JSON.stringify(feedback), {
                        headers: headers
                    })
                    .map(this.extractData)
                    .catch(this.handleError);
            }
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
