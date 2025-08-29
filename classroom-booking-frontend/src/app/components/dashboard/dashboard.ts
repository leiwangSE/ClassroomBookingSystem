import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// Update the path below if your booking.service file is in a different location
import { BookingService, Classroom, Booking } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-dashboard',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './dashboard.html',
 styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
 currentUser: any = null;
 activeTab = 'overview';
 
 // Data
 classrooms: Classroom[] = [];
 myBookings: Booking[] = [];
 
 // Booking form
 newBooking = {
   classroomId: 0,
   startDate: '',
   startTime: '',
   endDate: '',
   endTime: '',
   purpose: ''
 };
 
 // Messages
 message = '';
 isError = false;
 loading = false;

 constructor(
   private authService: AuthService,
   private bookingService: BookingService,
   private router: Router
 ) {}

 ngOnInit(): void {
   const userData = localStorage.getItem('currentUser');
   this.currentUser = userData ? JSON.parse(userData) : null;
   
   if (!this.currentUser) {
     this.router.navigate(['/login']);
     return;
   }
   
   this.loadData();
 }

 loadData(): void {
   this.loadClassrooms();
   this.loadMyBookings();
 }

 loadClassrooms(): void {
   this.bookingService.getClassrooms().subscribe({
     next: (classrooms: Classroom[]) => {
       this.classrooms = classrooms;
     },
     error: (error: any) => {
       this.showMessage('Failed to load classrooms', true);
     }
   });
 }

 loadMyBookings(): void {
   this.bookingService.getMyBookings().subscribe({
     next: (bookings: Booking[]) => {
       this.myBookings = bookings;
     },
     error: (error: any) => {
       this.showMessage('Failed to load bookings', true);
     }
   });
 }

 setActiveTab(tab: string): void {
   this.activeTab = tab;
   this.clearMessage();
 }

 createBooking(): void {
    console.log('createBooking method called');
    console.log('Form data:', this.newBooking);
   // Validation
   if (!this.newBooking.classroomId || !this.newBooking.startDate || 
       !this.newBooking.startTime || !this.newBooking.endDate || 
       !this.newBooking.endTime || !this.newBooking.purpose.trim()) {
     this.showMessage('Please fill in all fields', true);
     return;
   }

   // Create datetime strings
   const startDateTime = `${this.newBooking.startDate}T${this.newBooking.startTime}:00`;
   const endDateTime = `${this.newBooking.endDate}T${this.newBooking.endTime}:00`;

   // Basic validation - end time after start time
   if (new Date(endDateTime) <= new Date(startDateTime)) {
     this.showMessage('End time must be after start time', true);
     return;
   }

   this.loading = true;
   const bookingData = {
     classroomId: this.newBooking.classroomId,
     startTime: startDateTime,
     endTime: endDateTime,
     purpose: this.newBooking.purpose
   };

   this.bookingService.createBooking(bookingData).subscribe({
     next: (response: any) => {
       this.loading = false;
       this.showMessage('Booking created successfully!', false);
       this.resetBookingForm();
       this.loadMyBookings(); // Refresh bookings list
     },
     error: (error: any) => {
       this.loading = false;
       this.showMessage('Failed to create booking', true);
     }
   });
 }

 cancelBooking(bookingId: number): void {

   console.log('cancelBooking called with ID:', bookingId);
   if (!confirm('Are you sure you want to cancel this booking?')) {
     return;
   }

   this.bookingService.cancelBooking(bookingId).subscribe({
     next: (response: any) => {
       this.showMessage('Booking cancelled successfully!', false);
       this.loadMyBookings(); // Refresh bookings list
     },
     error: (error: any) => {
       this.showMessage('Failed to cancel booking', true);
     }
   });
 }

 resetBookingForm(): void {
   this.newBooking = {
     classroomId: 0,
     startDate: '',
     startTime: '',
     endDate: '',
     endTime: '',
     purpose: ''
   };
 }

 showMessage(msg: string, error: boolean): void {
   this.message = msg;
   this.isError = error;
   setTimeout(() => this.clearMessage(), 5000);
 }

 clearMessage(): void {
   this.message = '';
   this.isError = false;
 }

 logout(): void {
   this.authService.logout();
   this.router.navigate(['/login']);
 }

 // Helper methods
 formatDateTime(dateTimeString: string): string {
   return new Date(dateTimeString).toLocaleString();
 }

 getTodaysDate(): string {
   return new Date().toISOString().split('T')[0];
 }

 getCurrentTime(): string {
   const now = new Date();
   return now.toTimeString().slice(0, 5);
 }
}