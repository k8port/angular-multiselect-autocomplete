import { Injectable } from '@angular/core';
import {Post} from './post';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchOption = [];
  public postsData: Post[];
  postUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  filteredListOptions(): any[] {
    const posts = this.postsData;
    const filteredPostsList = [];
    console.log(`iterate through posts returned by fake API service...`);
    for (const post of posts) {
      console.log(`post: ${post}`);
      console.log(`iterating over options....`);
      for (const options of this.searchOption) {
        console.log(`options of this.searchOption are ${options}`);
        console.log(`options.title (${options.title}) === post.tile(${post.title})?`);
        if (options.title === post.title) {
          console.log(`true...push post to filteredPostsList: ${post}`);
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
