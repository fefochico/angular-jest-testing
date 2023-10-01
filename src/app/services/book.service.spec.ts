import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../environments/environment";


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
]

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

    beforeEach(()=>{
        service= TestBed.inject(BookService);
        // Para versiones antiguas al 9
        // service = TestBed.get(BookService)
        httpMock =  TestBed.inject(HttpTestingController);
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
});