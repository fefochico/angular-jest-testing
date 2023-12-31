import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Book } from "../../models/book.model";
import { of } from "rxjs";


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

describe('Home component', ()=>{
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    //let service: BookService;

    //Configuracion
    beforeEach(()=>{//Antes de cada test
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations:[HomeComponent],
            providers:[
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    //Incializacion
    beforeEach(()=>{//Antes de cada test
        fixture= TestBed.createComponent(HomeComponent);
        component= fixture.componentInstance;
        fixture.detectChanges();
    });
    
    //Despues de cada test
    afterEach(()=>{
        fixture.destroy();
        jest.resetAllMocks();
    })
    
    //Test incial
    it('should create', ()=>{
        expect(component).toBeTruthy();
    });

    //Test de un subscribe del que depende el resultado.
    it('getBooks get books from subscription', ()=>{
        const bookService=fixture.debugElement.injector.get(BookService);
        const spy1= jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(listBook));
        component.getBooks();
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(component.listBook.length).toBe(3);
        expect(component.listBook).toEqual(listBook);
    });
})