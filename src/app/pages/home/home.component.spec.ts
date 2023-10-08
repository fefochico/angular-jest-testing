import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Book } from "../../models/book.model";
import { of } from "rxjs";
import { DOCUMENT } from "@angular/common";

// En este caso hemos anadido un mock del BookService, 
// es muy util cuando a lo largo del test
// se usa varios metodos del servicio

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

@Pipe({name: 'reduceText'})
class ReducePipeMock implements PipeTransform{
    transform(value: any, ...args: any[]):string {
        return '';
    }
}
const bookServiceMock ={
    getBooks: ()=> of(listBook)
}


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
            declarations:[HomeComponent, ReducePipeMock],
            providers:[
                {
                    provide: BookService,
                    useValue: 
                        bookServiceMock
                },
                {
                    provide: Document,
                    useExisting: DOCUMENT,
                }
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
    
    //Test incial
    it('should create', ()=>{
        expect(component).toBeTruthy();
    });

    it('getBooks get books from subscription', ()=>{
        component.getBooks();
        expect(component.listBook.length).toBe(3);
        expect(component.listBook).toEqual(listBook);
    });

    //Test de windows.alert o this.document
    it('test alert', () => {
        const document= TestBed.inject(Document)
        const doc= document.defaultView!;
        const spy= jest.spyOn(doc, 'alert').mockImplementation(() => null);
        component.ngOnInit();
        expect(spy).toHaveBeenCalled()
    });
});