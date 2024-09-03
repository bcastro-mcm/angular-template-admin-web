import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MaterialModule } from '../../../material.module';
import { PublicService } from '@infrastructure/services/public.service';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './table.component.html',
})


export class TableComponent {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  constructor(
    breakpointObserver: BreakpointObserver,
    public _public: PublicService
  ) {

    // breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
    //   this.displayedColumns = result.matches
    //     ? ['id', 'name', 'business_role', 'url_linkendin', 'isActive']
    //     : ['id', 'name', 'business_role', 'url_linkendin', 'isActive'];
    // });


  
    this.dataSource = new MatTableDataSource();

    
  }

  
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.columns.forEach(element => {
      this.displayedColumns.push(element.id);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getType(value: any): string {
    return typeof value;
  }

  jsonStringify(value: object): string {
    return JSON.stringify(value);
  }
}







