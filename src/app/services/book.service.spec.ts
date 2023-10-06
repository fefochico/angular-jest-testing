import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../environments/environment";
import swal from 'sweetalert2';


const listBook: Book[]=[ 
    {
        name: '',
        author: '',
        isbn: '',
        amount: 2,
        price: 15
    },
    {
        name: '',
        author: '',
        isbn: '',
        amount: 1,
        price: 20
    },
    {
        name: '',
        author: '',
        isbn: '',
        amount: 7,
        price: 8
    }
];

describe('BookService', ()=>{
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations:[],
            providers:[
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    });

    beforeEach(() => {
        service= TestBed.inject(BookService);
        // Para versiones antiguas al 9
        // service = TestBed.get(BookService)
        httpMock =  TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        jest.resetAllMocks();
        localStorage.clear();
    });

    afterEach(()=>{
        httpMock.verify();
    });

    it('should create', ()=>{
        expect(service).toBeTruthy();
    });

    it('getBooks return a list of books and does a get method', ()=>{
        service.getBooks().subscribe((resp: Book[]) =>  {
            expect(resp).toEqual(listBook);
        });
        
        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        req.flush(listBook);
    });

    it('getBooksFromCart return a empty array when localstorage is empty', ()=>{
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

    it('getBooksFromCart return an array of books when it exists in the localstorage', ()=>{
        localStorage.setItem('listCartBook', JSON.stringify(listBook))
        const newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(3);
    });

    it('addBookToCart add a book successfully when the list does not exists in the localStorage', ()=>{
        const book: Book =     {
            name: '',
            author: '',
            isbn: '',
            amount: 2,
            price: 15
        };
        //mockeamos tipo de objeto que devuelve la funcion de la libreria externa
        const toastMock = {
            fire: () => null
        } as any;
        //mockeamos libreria externa
        const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
            return toastMock;
        })
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
        service.addBookToCart(book);
        expect(spy1).toHaveBeenCalledTimes(1);
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
    });


    it('removeBooksFromCart remove the list from the localStorage', ()=>{
        //mockeamos tipo de objeto que devuelve la funcion de la libreria externa
        const toastMock = {
            fire: () => null
        } as any;
        //mockeamos libreria externa
        const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
            return toastMock;
        });
        const book: Book =     {
            name: '',
            author: '',
            isbn: '',
            amount: 2,
            price: 15
        };
        service.addBookToCart(book);
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        service.removeBooksFromCart();
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
    });

});