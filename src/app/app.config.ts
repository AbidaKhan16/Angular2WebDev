import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Routes, Router, RouterModule } from '@angular/router';
@Injectable()
export class assets {

  constructor() { }
  api_key: any = 'c112f68c22a4b6ff1240e072f64677d155b3d05488bcf5c5194b88aef04ea765';
  url: any = 'http://50.116.31.177:9104/api/v1'; // STAGING URL
}
