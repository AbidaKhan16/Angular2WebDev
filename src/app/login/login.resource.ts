import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Routes, Router, RouterModule } from '@angular/router';

// injectable ts file

import { assets } from '../app.config';


@Injectable()
export class loginFactory {
  // ..create Headers.....
  api_key = this.assets.api_key;
  apiUrl = this.assets.url;
  ContentType: any = "application/json";

  headers: any = new Headers({ 'Content-Type': this.ContentType, 'api_key': this.api_key });
  options = new RequestOptions({ headers: this.headers });


  constructor(public http: Http, public assets: assets) { }

  login(body) {
    return this.http.post(this.apiUrl + '/admin/login', body, this.options)
      .map((response: Response) => {
        return response;
      });
  }
}
