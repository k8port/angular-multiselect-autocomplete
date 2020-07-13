import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Post} from '../post';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  frmCntrl = new FormControl();
  filteredOptions$: Observable<string[]>;
  allPosts: Post[];
  autoCompleteList: string | Post[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() selectedOption = new EventEmitter();

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(posts => {
      console.log(`\ngetAllPosts from Service (search-bar): ${posts}`);
      this.allPosts = posts;
    });

    this.frmCntrl.valueChanges.subscribe(userInput => {
      console.log(`\nwhen user types in input field, value changes come through here as userInput: ${userInput}`);
      this.autoCompleteExpenseList(userInput);
    });
  }

  private autoCompleteExpenseList(userInput: any) {
    const categoryList = this.filterCategoryList(userInput);
    console.log(`\nautocompleteExpenseList called by input valueChanges Observable with userInput: ${userInput}`);
    console.log(`\nautocompleteExpenseList filters and assigns to autoCompleteList: ${categoryList}`);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(value: any): string | Post[] {
    console.log(`\nfilterCategoryList(value: any) called: filtering autocomplete options by value of userInput with value = ${value}`);
    if (typeof value !== 'string' || value === '' || value === null) {
      return [];
    }
    return value ? this.allPosts.filter(post => post.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) : this.allPosts;
  }

  displayFn(post: Post): string | Post {
    console.log(`\ndisplayFn(post) with post = ${post}. Shows selected field in input`);
    return post ? post.title : post;
  }

  filterPostList(event): void {
    console.log(`\nfilterPostList(event) and event=${event.target}`);
    const posts = event.source.value;
    if (!posts) {
      this.dataService.searchOption = [];
    } else {
      this.dataService.searchOption.push(posts);
      this.selectedOption.emit(this.dataService.searchOption);
    }
    this.focusOnPlaceInput();
  }

  removeOption(option: any) {
    console.log(`\nremoveOption ${option}`);
    const index = this.dataService.searchOption.indexOf(option);
    console.log(`removeOption---${index}`);
    if (index >= 0) {
      console.log(`splice at index-- ${index}`);
      this.dataService.searchOption.splice(index, 1);
    }
    this.focusOnPlaceInput();
    this.selectedOption.emit(this.dataService.searchOption);
  }

  private focusOnPlaceInput() {
    console.log(`focus input field`);
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }
}
