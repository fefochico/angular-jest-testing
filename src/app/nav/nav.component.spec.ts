import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
// import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";


//class ComponentTestRoute {}
const routerMock={
    navigate(){}
}
describe('Nav component', ()=> {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[
                // RouterTestingModule.withRoutes([
                //     {path: 'home', component: ComponentTestRoute}, 
                //     {path: 'cart', component: ComponentTestRoute}
                // ])
            ],
            declarations:[
                NavComponent
            ],
            providers:[//Si no tenemos identificado RouterTestingModule
                {
                    privede: Router, useValue: routerMock
                }
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(()=>{
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=> {
        expect(component).toBeTruthy();
    });

    //Testing con routerTestingModule
    // it('NavTo should navigate', ()=> {
    //     const router= TestBed.inject(Router);
    //     const spy1= jest.spyOn(router, 'navigate');
    //     component.navTo('home');
    //     expect(spy1).toHaveBeenCalledWith(['/home']);
    // });

    //Testing sin routerTestingModule, sirve para redux tambien o cosas de ese tipo
    it('NavTo should navigate', ()=> {
         const router= TestBed.inject(Router);
         const spy1= jest.spyOn(router, 'navigate');
         component.navTo('');
         expect(spy1).toHaveBeenCalled();
    });
});