import { Component, OnInit } from '@angular/core';
import {Post} from '../post';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  post: Post[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('\n');
    this.dataService.getPosts().subscribe(posts => {
      console.log(`homePage onInit subscribe to posts: ${posts}`);
      this.post = posts;
      this.dataService.postsData = posts;
    });
  }

  onSelectedFilter(event) {
    console.log(`\nhomePage onSelectedFilter ${event}`);
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    console.log(`\nhomePage getFilteredExpenseList()`);
    if (this.dataService.searchOption.length > 0) {
      this.post = this.dataService.filteredListOptions();
      console.log(`searchOption has content ${this.post}`);
    } else {
      this.post = this.dataService.postsData;
      console.log(`searchOption no prior content ${this.post}`);
    }
  }

}
