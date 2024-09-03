import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PublicService } from '@infrastructure/services/public.service';
import { AppText } from '@utils/app-text';
import { ColumnsData } from '@models/public.model';
import { Paginator } from '@models/api.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { urlAsset } from '@utils/app-utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input({ required: true }) paginator!: Paginator;
  @Input({ required: true }) isLoad!: boolean;
  @Input() columns: ColumnsData[] = [];
  @Input() data: any[] = [];
  @Input() enabledAction: boolean = false;
  @Input() enabledSelection: boolean = false;

  @Output() onChangePage = new EventEmitter<Paginator>();
  @Output() onPressAction = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<any>();
  @Output() onPressRow = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();

  txt = AppText;
  txtColumns: string[] = [];

  private searchText$ = new Subject<string>();

  constructor(public _public: PublicService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.txtColumns = this.columns.map((item) => item.label);
    // DEBOUNCER INPUT
    this.searchText$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      tap( (value:string) => {
        this.onSearch.emit(value);
        return value;
      })
    ).subscribe();

  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  ngOnDestroy(): void {
    this.searchText$.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText$.next(filterValue);
  }

  onChangePagePaginator(event: PageEvent): void {
    if (event.pageSize !== this.paginator.perPage) {
      this.paginator.perPage = event.pageSize;
      this.paginator.currentPage = 1;
      this.onChangePage.emit(this.paginator);
      return;
    }

    if (event.previousPageIndex === undefined) return;

    if (this.data.length === this.paginator.total) return;

    if (event.pageIndex < this.paginator.currentPage) {
      this.paginator.currentPage = event.pageIndex + 1;
      this.onChangePage.emit(this.paginator);
      return;
    }

    if (this.paginator.currentPage < this.paginator.totalPages) {
      this.paginator.currentPage = event.pageIndex + 1;
      this.onChangePage.emit(this.paginator);
    }
  }

  pressEdit(element: any): void {
    this.onPressAction.emit(element);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  urlImg(path:string){
    return urlAsset(path);
  }
  onPress(data:any, label:string){
    if(label == 'actions') return
    this.onPressRow.emit(data)
  }

  /**
   *
   * * Checkboxes
   */

  selection = new SelectionModel<any>(true, []);
  allSelected: boolean = true;
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.onSelected.emit(this.isAllSelected());
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  onClickCheckbox(element: any) {
    this.onSelected.emit(element);
    // console.log(element);
  }

  colorBadge( data:any ){

    const typesBadge:any = {
      'complete': 'badge-success',
      'send': 'badge-success',
      'sending': 'badge-sending',
      'not_sending': 'badge-warning',
      'error': 'badge-error',
      'canceled': 'badge-warning',
      'incompleted': 'badge-accent',
    }

    return typesBadge[data] || ''
  }
}
