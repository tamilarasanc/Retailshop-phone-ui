import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit {
  @Input() cols: any[];
  @Input() data: any[];
  @Input() sortField: string;
  @Input() scrollable: boolean;
  @Input() totalRecords: string;
  @Input() rows: string;
  @Input() minBufferPx: number;
  @Input() maxBufferPx: number;
  @Input() virtualScroll: boolean;
  @Input() scrollHeight: string;
  @Input() lazy: boolean;
  @Input() virtualRowHeight: string;
  @Input() loading: boolean;
  @Input() lastUpdatedUserId: number;
  @Output() loadChunk = new EventEmitter();
  @Output() selectedDataRow = new EventEmitter();
  @Output() totalSelectedData = new EventEmitter();
  selectedData = [];

  @ViewChild('ptable') pTable: Table;

  constructor(private elRef: ElementRef) {}
  ngOnInit() {}
  loadDataOnScroll(event: LazyLoadEvent) {
    this.loading = true;
    this.loadChunk.emit(event);
  }
  onRowSelect(event) {
    this.selectedDataRow.emit(event);
  }
  reset() {
    this.pTable.reset();
  }
  resetScrollTop() {
    const body = this.pTable.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
    if (!!body && !!body.scrollTop) {
      body.scrollTop = 0;
    }
  }

  selectRow(event, data) {
    if (event.target.checked) {
      this.selectedData.push(data);
    } else {
      let userIndex;
      userIndex = this.selectedData.findIndex(mem => {
        return mem.id === data.id;
      });
      if (userIndex > -1) {
        this.selectedData.splice(userIndex, 1);
      }
    }
    this.totalSelectedData.emit(this.selectedData)
  }
}
