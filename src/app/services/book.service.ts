import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

import swal from 'sweetalert2';


@Injectable()
export class BookService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public getBooks(): Observable<Book[]> {
    const url: string = environment.API_REST_URL + `/book`;
    return this._httpClient.get<Book[]>(url);
  }

  public getBooksFromCart(): Book[] {
    const result=localStorage.getItem('listCartBook');
    let listBook: Book[] = result?JSON.parse(result):null;
    if (listBook === null) {
      listBook = [];
    }
    return listBook;
  }

  public removeBooksFromCart(): void {
    localStorage.setItem('listCartBook', '');
  }

  public addBookToCart(book: Book) {
    const result=localStorage.getItem('listCartBook');
    let listBook: Book[] = result?JSON.parse(result):null;
    if (listBook === null) { // Create a list with the book
      book.amount = 1;
      listBook = [ book ];
    } else { 
      const index = listBook.findIndex((item: Book) => {
        return book.id === item.id;
      });
      if (index !== -1 && index && listBook[index] && listBook[index].amount){
        listBook[index].amount!+=1;
      } else { 
        book.amount = 1;
        listBook.push(book);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    this._toastSuccess(book);
  }

  public updateAmountBook(book: Book): Book[] {
    const listBookCart = this.getBooksFromCart();
    const index = listBookCart.findIndex((item: Book) => {
      return book.id === item.id;
    });
    if (index !== -1) {
      listBookCart[index].amount = book.amount;
      if (book.amount === 0) {
        listBookCart.splice(index, 1);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBookCart));
    return listBookCart;
  }

  private _toastSuccess(book: Book) {
    const Toast = swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: book.name + ' added to cart'
    });
  }
}
