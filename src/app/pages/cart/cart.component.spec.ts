import { CartComponent } from "./cart.component";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, inject } from "@angular/core";
import { Book } from "../../models/book.model";
import { By } from "@angular/platform-browser";

//xit, xdescribe se salta el test o grupo de test
//fit, fdescribe solo se realizan los que tiene f
//it.only, describe.only es igual que f

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

describe('Cart component', ()=>{
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    //Configuracion
    beforeEach(()=>{//Antes de cada test
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations:[
                CartComponent
            ],
            providers:[
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    //Incializacion
    beforeEach(()=>{//Antes de cada test
        fixture= TestBed.createComponent(CartComponent);
        component= fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(()=> listBook);
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

    //Forma alternativa de hacer test pero CartComponent debe ir en provider en vez de declaration
    // it('should create', inject([CartComponent], (component2: CartComponent) => {
    //     expect(component2).toBeTruthy()
    // }));

    //Test funcion
    it('getTotalPrice returns an amount', ()=>{
        const totalPrice= component.getTotalPrice(listBook)
        expect(totalPrice).toEqual(106);
    });

    //Test funcion con llamada a servicio y otro metodo publico
    it('onInputNumberChange increment correctly', ()=>{
        const action = 'plus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            amount: 2,
            price: 15
        };
        //const serviceOldAngular9= TestBed.get(BookService);
        //const service= fixture.debugElement.injector.get(BookService);
        const spy1= jest.spyOn(service, 'updateAmountBook').mockImplementation(() => [] );
        const spy2= jest.spyOn(component, 'getTotalPrice').mockImplementation(() => 0 );
        
        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(book.amount).toBe(3);

    });

    //Test funcion con llamada a servicio y otro metodo publico
    it('onInputNumberChange decrement correctly', ()=>{
        const action = 'minus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            amount: 2,
            price: 15
        };
        const spy1= jest.spyOn(service, 'updateAmountBook').mockImplementation(() => [] );
        const spy2= jest.spyOn(component, 'getTotalPrice').mockImplementation(() => 0 );
        
        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(book.amount).toBe(1);
    });


    //Test funcion con llamada a servicio y otro metodo privado
    it('onClearBooks works correctly', ()=>{
        const spy1= jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null );
        const spy2= jest.spyOn(component as any, '_clearListCartBook')

        component.listCartBook=listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    //Test funcion privada con llamada a servicio 
    it('_clearListCartBook works correctly', ()=>{
        const spy1= jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null );
        
        component.listCartBook=listBook;
        component['_clearListCartBook']();
        
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);
    });

    //Test de integracion
    it('The title The cart is empty is not displayed when there is a list', ()=> {
        component.listCartBook = listBook;
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeFalsy();
    })

    //Test de integracion
    it('The title The cart is empty is displayed when the list is empty', ()=> {
        component.listCartBook = [];
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();
        if(debugElement){
            const element: HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain("The cart is empty");
        }
    })
})