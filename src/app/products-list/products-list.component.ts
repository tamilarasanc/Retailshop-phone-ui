import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {SharedTableComponent} from "../shared-table/shared-table.component";
import {CommonService} from "../services/common/common.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  columns = [
    {
      header: 'Manufacturer',
      field: 'manufacturer',
      sortable: true,
      sorted: true,
    },
    {
      header: 'Model',
      field: 'model',
      sortable: true,
      sorted: false,
    },
    {
      header: 'Storage',
      field: 'storage',
      sortable: true,
      sorted: false,
    },
    {
      header: 'Year',
      field: 'year',
      sortable: true,
      sorted: false,
    },
    {
      header: 'Color',
      field: 'color',
      sortable: true,
      sorted: false,
    },
    {
      header: 'Price',
      field: 'price',
      sortable: true,
      sorted: false,
      currency: true
    }
  ];
  activityLoading = true;
  products: object[];

  totalRecords: number;
  scrollable: boolean;
  virtualScroll: boolean;
  rows: number;
  minBufferPx: number;
  maxBufferPx: number;
  scrollHeight: string;
  lazy: boolean;
  virtualRowHeight: number;
  loading: boolean;
  limit: number;
  offset: number;
  display = false;
  selectedFile: any;
  tableSelectedData = [];
  shippingAddress: FormGroup;
  showPurchase = false;

  @ViewChild('sharedTable') sharedTable: SharedTableComponent;
  @ViewChild('myFile') fileElement: ElementRef;
  constructor(private productsService: ProductsService,
              private commonService: CommonService,
              private authService: AuthService) { }

  ngOnInit() {
    this.initScroll();
    this.getProducts();
  }

  initShippingForm() {
    this.shippingAddress =  new FormGroup({
      name: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required),
    });
  }

  async loadProducts(event) {
    if (this.limit === event.rows && this.offset === event.first) {
      console.log('Discarding fetch for same query');
      return;
    }

    this.limit = event.rows;
    this.offset = event.first;
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts(1, this.offset, this.limit).toPromise()
      .then(data => {
        this.products = data['products'];
        this.totalRecords = data['total_records']
      }, error => {
        console.log(error);
      });
  }

  initScroll() {
    this.scrollable = true;
    this.rows = 15;
    this.scrollHeight = '540px';
    this.virtualScroll = true;
    this.lazy = true;
    this.virtualRowHeight = 36;
  }

  showUploader(e) {
    this.display = true
  }

  addFile(files) {
    this.selectedFile =  files[0];
    console.log(this.selectedFile);
  }

  uploadInventory() {
    if (this.selectedFile) {
      this.productsService.uploadInventory(1, this.selectedFile).toPromise()
          .then(data => {
            this.commonService.loadMessage('info', 'Inventry Upload Status', data.message)
            this.fileElement.nativeElement.value = '';
            this.selectedFile = '';
            this.display = false;
            this.getProducts();
          }, error => {
            this.fileElement.nativeElement.value = '';
            this.selectedFile = '';
            this.commonService.loadMessage('error', 'Inventry Upload Status',
                'Please check browser log for more details')
          });
    } else {
      this.commonService.loadMessage('info', 'Status',
          'Please upload the file')
    }
  }

  downloadSample() {
    let link = document.createElement("a");
    link.download = "sample-file.xlsx";
    link.href = "assets/sample-files/retail-inventory.xlsx";
    link.click();
  }

  totalSelectedData(event) {
    this.tableSelectedData = event;
    console.log(this.tableSelectedData)
  }

  showPurchasePops() {
    this.initShippingForm();
    this.showPurchase = true;
  }

  purchaseProducts() {
    if (this.tableSelectedData.length > 0) {
      const productIds = this.tableSelectedData.map((val)=>{return val.id});
      const params = this.buildPurchaseParams(productIds);
      this.productsService.purchaseProduct(1, params).toPromise()
          .then( response => {
            this.commonService.loadMessage('info', 'Purchase Status',
                response.message)
            this.tableSelectedData = [];
            this.showPurchase = false;
            this.getProducts();
          }, error => {
            this.commonService.loadMessage('error', 'Purchase Status',
                'Please check browser log for more info')
          });
    } else {
      this.commonService.loadMessage('info', 'Purchase Status',
          'Please select the products')
    }
  }

  buildPurchaseParams(productIds) {
    const shipping = this.shippingAddress.value;
    return {
      shipping_address: {
        address1: shipping.address1,
        address2: shipping.address2,
        name: shipping.name,
        city: shipping.city,
        state: shipping.state,
        postal_code: shipping.postal_code
      },
      products: productIds
    }
  }
}
