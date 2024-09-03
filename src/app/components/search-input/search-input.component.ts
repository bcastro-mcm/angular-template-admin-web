import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AppText } from '@utils/app-text';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit, OnDestroy {

  @Input() placeholder: string = AppText.search;
  @Input() txtValue: string = '';
  @Input() isReadOnly: boolean = false;

  @Output() onSearch = new EventEmitter<string>();
  @Output() onPress = new EventEmitter<string>();


  private searchText$ = new Subject<string>();
  txt = AppText

  constructor(){}

  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      tap( (value:string) => {
        this.onSearch.emit(value);
        return value;
      })
    ).subscribe();
  }

  onPressInput(){
    if (this.isReadOnly) {
      this.onPress.emit();
    }
  }

  ngOnDestroy(): void {
    this.searchText$.unsubscribe();
  }

  search(query: string) {
    this.searchText$.next(query);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  clear(){
    const searchbox = document.getElementById('searchbox') as HTMLInputElement;
    searchbox.focus();
    searchbox.value = '';
    this.searchText$.next('');
  }
}
