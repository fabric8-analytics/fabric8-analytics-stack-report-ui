import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';

import { ComponentFeedbackComponent } from './component-feedback.component';
import { ToastNotificationModule } from '../../toast-notification/toast-notification.module';
import { StackAnalysesService } from '../../stack-analyses.service';

describe ('ComponentFeedbackComponent', () => {
    let component: ComponentFeedbackComponent;
    let fixture: ComponentFixture<ComponentFeedbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ToastNotificationModule
            ],
            declarations: [
                ComponentFeedbackComponent
            ],
            providers: [
                Http,
                ConnectionBackend,
                { provide: RequestOptions, useClass: BaseRequestOptions },
                StackAnalysesService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentFeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
