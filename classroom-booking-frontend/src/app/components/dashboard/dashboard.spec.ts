import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';

describe('DashboardComponent', () => {
 let component: DashboardComponent;
 let fixture: ComponentFixture<DashboardComponent>;

 // Mock services
 const mockAuthService = {
   logout: jasmine.createSpy('logout')
 };

 const mockBookingService = {
   getClassrooms: jasmine.createSpy('getClassrooms').and.returnValue({ subscribe: () => {} }),
   getMyBookings: jasmine.createSpy('getMyBookings').and.returnValue({ subscribe: () => {} }),
   createBooking: jasmine.createSpy('createBooking').and.returnValue({ subscribe: () => {} }),
   cancelBooking: jasmine.createSpy('cancelBooking').and.returnValue({ subscribe: () => {} })
 };

 beforeEach(async () => {
   // Mock localStorage
   spyOn(localStorage, 'getItem').and.returnValue('{"username":"testuser","token":"test-token"}');

   await TestBed.configureTestingModule({
     imports: [
       DashboardComponent,
       RouterTestingModule,
       FormsModule
     ],
     providers: [
       { provide: AuthService, useValue: mockAuthService },
       { provide: BookingService, useValue: mockBookingService }
     ]
   })
   .compileComponents();

   fixture = TestBed.createComponent(DashboardComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 it('should load user data from localStorage', () => {
   expect(component.currentUser).toBeTruthy();
   expect(component.currentUser.username).toBe('testuser');
 });

 it('should call loadData on init', () => {
   spyOn(component, 'loadClassrooms');
   spyOn(component, 'loadMyBookings');
   
   component.ngOnInit();
   
   expect(component.loadClassrooms).toHaveBeenCalled();
   expect(component.loadMyBookings).toHaveBeenCalled();
 });

 it('should set active tab', () => {
   component.setActiveTab('book');
   expect(component.activeTab).toBe('book');
 });

 it('should reset booking form', () => {
   component.newBooking.classroomId = 5;
   component.newBooking.purpose = 'Test';
   
   component.resetBookingForm();
   
   expect(component.newBooking.classroomId).toBe(0);
   expect(component.newBooking.purpose).toBe('');
 });

 it('should show and clear messages', () => {
   component.showMessage('Test message', false);
   
   expect(component.message).toBe('Test message');
   expect(component.isError).toBe(false);
   
   component.clearMessage();
   
   expect(component.message).toBe('');
   expect(component.isError).toBe(false);
 });

 it('should format date time', () => {
   const dateTime = '2025-01-15T10:00:00';
   const formatted = component.formatDateTime(dateTime);
   
   expect(formatted).toContain('2025');
 });

 it('should get today date', () => {
   const today = component.getTodaysDate();
   const expectedFormat = /^\d{4}-\d{2}-\d{2}$/;
   
   expect(today).toMatch(expectedFormat);
 });

 it('should get current time', () => {
   const time = component.getCurrentTime();
   const expectedFormat = /^\d{2}:\d{2}$/;
   
   expect(time).toMatch(expectedFormat);
 });
});