import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserIntentService {
    constructor(private http: Http) {}

    /**
     * @method POST
     * @description save user tags for a component
     */
    public submitUserIntent(userIntentData: any, params?: any): Observable<any> {
        let url: string = 'api/v1/user-intent';
        if (params) {
            if (params['access_token']) {
                if (params['config'] && params['config']['api_url']) {
                    url = params['config']['api_url'] + url;
                    let headers: Headers = new Headers({'Content-Type': 'application/json'});
                    headers.append('Authorization', 'Bearer ' + params['access_token']);
                    return this.http
                        .post(url, JSON.stringify(userIntentData), {
                            headers: headers
                        })
                        .map(this.extractData)
                        .catch(this.handleError);
                }
            }
        }
    }

    /**
     * @method GET
     * @description get unknown component to be tagged
     */
    public getUnknownComponent(ecosystem: any, params?: any): Observable<any> {
        let url: string = 'api/v1/user-intent';
        if (params) {
            if (params['access_token']) {
                if (params['config'] && params['config']['api_url']) {
                    url = params['config']['api_url'] + url;
                    let headers: Headers = new Headers({'Content-Type': 'application/json'});
                    headers.append('Authorization', 'Bearer ' + params['access_token']);
                    return this.http
                        .get(url+"/"+ecosystem, {
                            headers:headers
                        })
                        .map(this.extractData)
                        .catch(this.handleError);
                }
            }
        }
    }

    /**
     * @method GET
     * @description get master taglist for ecosystem
     */
    public getMasterTagList(ecosystem: any, params?: any): Observable<any> {
        let url: string = 'api/v1/master-taglist';
        if (params) {
            if (params['access_token']) {
                if (params['config'] && params['config']['api_url']) {
                    url = params['config']['api_url'] + url;
                    let headers: Headers = new Headers({'Content-Type': 'application/json'});
                    headers.append('Authorization', 'Bearer ' + params['access_token']);
                    return this.http
                        .get(url+"/"+ecosystem, {
                            headers:headers
                        })
                        .map(this.extractData)
                        .catch(this.handleError);
                }
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
