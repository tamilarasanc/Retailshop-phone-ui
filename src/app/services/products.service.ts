import { Injectable } from '@angular/core';
import {ShopsService} from "../modules/retail-api/generated/services/shops.service";
import {Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private shopsService: ShopsService,
              private http: HttpClient) { }

  // get products
  getProducts(shopId = 1, offset = 0, limit = 30): Observable<any> {
    return this.shopsService.getApiV1ShopsShopIdProducts({shopId: shopId, offset: offset, limit: limit})
      .pipe( // mergeMap
        // wait for promise to resolve, then return resolved result. In this case, flows. See  https://stackoverflow.com/a/53650135
        mergeMap(response => {
          return Promise.resolve(response); // returns a Promise
        })
      );
  }

  uploadInventory(shopId=1, file): Observable<any> {
      return this.shopsService.postApiV1ShopsShopIdBulkImport({shopId: shopId, file: file})
          .pipe(
              mergeMap(response => {
                  return Promise.resolve(response); // returns a Promise
              })
          )
  }

    purchaseProduct(shop_id,params): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'});
        let options = { headers: headers };
        return this.http.post(environment.apiBaseUrl+`/api/v1/shops/${shop_id}/purchase`, params,
            options)
            .pipe(
                mergeMap(response => {
                    return Promise.resolve(response); // returns a Promise
                })
            )
    }
}
