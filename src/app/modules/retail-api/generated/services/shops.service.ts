/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Operations about shops
 */
@Injectable({
  providedIn: 'root',
})
class ShopsService extends __BaseService {
  static readonly getApiV1ShopsShopIdPurchasedPath = '/api/v1/shops/{shop_id}/purchased';
  static readonly postApiV1ShopsShopIdPurchasePath = '/api/v1/shops/{shop_id}/purchase';
  static readonly postApiV1ShopsShopIdBulkImportPath = '/api/v1/shops/{shop_id}/bulk_import';
  static readonly getApiV1ShopsShopIdProductsPath = '/api/v1/shops/{shop_id}/products';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get purchased products
   * @param params The `ShopsService.GetApiV1ShopsShopIdPurchasedParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `offset`:
   *
   * - `limit`:
   */
  getApiV1ShopsShopIdPurchasedResponse(params: ShopsService.GetApiV1ShopsShopIdPurchasedParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/shops/${params.shopId}/purchased`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Get purchased products
   * @param params The `ShopsService.GetApiV1ShopsShopIdPurchasedParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `offset`:
   *
   * - `limit`:
   */
  getApiV1ShopsShopIdPurchased(params: ShopsService.GetApiV1ShopsShopIdPurchasedParams): __Observable<null> {
    return this.getApiV1ShopsShopIdPurchasedResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Purchase products
   * @param params The `ShopsService.PostApiV1ShopsShopIdPurchaseParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `shipping_address[state]`:
   *
   * - `shipping_address[postal_code]`:
   *
   * - `shipping_address[name]`:
   *
   * - `shipping_address[city]`:
   *
   * - `shipping_address[address1]`:
   *
   * - `products`:
   *
   * - `shipping_address[address2]`:
   */
  postApiV1ShopsShopIdPurchaseResponse(params: ShopsService.PostApiV1ShopsShopIdPurchaseParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;

    if (params.shippingAddressState != null) { __formData.append('shipping_address[state]', params.shippingAddressState as string | Blob);}
    if (params.shippingAddressPostalCode != null) { __formData.append('shipping_address[postal_code]', JSON.stringify(params.shippingAddressPostalCode));}
    if (params.shippingAddressName != null) { __formData.append('shipping_address[name]', params.shippingAddressName as string | Blob);}
    if (params.shippingAddressCity != null) { __formData.append('shipping_address[city]', params.shippingAddressCity as string | Blob);}
    if (params.shippingAddressAddress1 != null) { __formData.append('shipping_address[address1]', params.shippingAddressAddress1 as string | Blob);}
    (params.products || []).forEach(val => {if (val != null) __formData.append('products', JSON.stringify(val))});
    if (params.shippingAddressAddress2 != null) { __formData.append('shipping_address[address2]', params.shippingAddressAddress2 as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/shops/${params.shopId}/purchase`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Purchase products
   * @param params The `ShopsService.PostApiV1ShopsShopIdPurchaseParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `shipping_address[state]`:
   *
   * - `shipping_address[postal_code]`:
   *
   * - `shipping_address[name]`:
   *
   * - `shipping_address[city]`:
   *
   * - `shipping_address[address1]`:
   *
   * - `products`:
   *
   * - `shipping_address[address2]`:
   */
  postApiV1ShopsShopIdPurchase(params: ShopsService.PostApiV1ShopsShopIdPurchaseParams): __Observable<null> {
    return this.postApiV1ShopsShopIdPurchaseResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Import products into the inventry
   * @param params The `ShopsService.PostApiV1ShopsShopIdBulkImportParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `file`:
   */
  postApiV1ShopsShopIdBulkImportResponse(params: ShopsService.PostApiV1ShopsShopIdBulkImportParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;

    if (params.file != null) { __formData.append('file', params.file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/shops/${params.shopId}/bulk_import`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Import products into the inventry
   * @param params The `ShopsService.PostApiV1ShopsShopIdBulkImportParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `file`:
   */
  postApiV1ShopsShopIdBulkImport(params: ShopsService.PostApiV1ShopsShopIdBulkImportParams): __Observable<null> {
    return this.postApiV1ShopsShopIdBulkImportResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Products listing based on shop with limit and offset
   * @param params The `ShopsService.GetApiV1ShopsShopIdProductsParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `offset`:
   *
   * - `limit`:
   */
  getApiV1ShopsShopIdProductsResponse(params: ShopsService.GetApiV1ShopsShopIdProductsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/shops/${params.shopId}/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Products listing based on shop with limit and offset
   * @param params The `ShopsService.GetApiV1ShopsShopIdProductsParams` containing the following parameters:
   *
   * - `shop_id`:
   *
   * - `offset`:
   *
   * - `limit`:
   */
  getApiV1ShopsShopIdProducts(params: ShopsService.GetApiV1ShopsShopIdProductsParams): __Observable<null> {
    return this.getApiV1ShopsShopIdProductsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ShopsService {

  /**
   * Parameters for getApiV1ShopsShopIdPurchased
   */
  export interface GetApiV1ShopsShopIdPurchasedParams {
    shopId: number;
    offset?: number;
    limit?: number;
  }

  /**
   * Parameters for postApiV1ShopsShopIdPurchase
   */
  export interface PostApiV1ShopsShopIdPurchaseParams {
    shopId: number;
    shippingAddressState: string;
    shippingAddressPostalCode: number;
    shippingAddressName: string;
    shippingAddressCity: string;
    shippingAddressAddress1: string;
    products: Array<number>;
    shippingAddressAddress2?: string;
  }

  /**
   * Parameters for postApiV1ShopsShopIdBulkImport
   */
  export interface PostApiV1ShopsShopIdBulkImportParams {
    shopId: number;
    file: Blob;
  }

  /**
   * Parameters for getApiV1ShopsShopIdProducts
   */
  export interface GetApiV1ShopsShopIdProductsParams {
    shopId: number;
    offset?: number;
    limit?: number;
  }
}

export { ShopsService }
