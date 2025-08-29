import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Classroom {
  id: number;
  name: string;
  capacity: number;
  isActive: boolean;
}

export interface Booking {
  id: number;
  classroomId: number;
  classroomName: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api';  // Changed from http://localhost:5198/api
  
  private mockBookings: Booking[] = [
    {
      id: 1,
      classroomId: 3,
      classroomName: 'Classroom 3',
      startTime: '2025-01-15T10:00:00',
      endTime: '2025-01-15T12:00:00',
      purpose: 'Team Meeting',
      status: 'Active',
      userName: 'admin'
    },
    {
      id: 2,
      classroomId: 7,
      classroomName: 'Classroom 7',
      startTime: '2025-01-16T14:00:00',
      endTime: '2025-01-16T16:00:00',
      purpose: 'Training Session',
      status: 'Active',
      userName: 'admin'
    },
    {
      id: 3,
      classroomId: 1,
      classroomName: 'Classroom 1',
      startTime: '2025-01-17T09:00:00',
      endTime: '2025-01-17T11:00:00',
      purpose: 'Workshop',
      status: 'Active',
      userName: 'admin'
    }
  ];

  getClassrooms(): Observable<Classroom[]> {
    const mockClassrooms: Classroom[] = [
      { id: 1, name: 'Classroom 1', capacity: 30, isActive: true },
      { id: 2, name: 'Classroom 2', capacity: 25, isActive: true },
      { id: 3, name: 'Classroom 3', capacity: 40, isActive: true },
      { id: 4, name: 'Classroom 4', capacity: 20, isActive: true },
      { id: 5, name: 'Classroom 5', capacity: 35, isActive: true },
      { id: 6, name: 'Classroom 6', capacity: 30, isActive: true },
      { id: 7, name: 'Classroom 7', capacity: 25, isActive: true },
      { id: 8, name: 'Classroom 8', capacity: 45, isActive: true },
      { id: 9, name: 'Classroom 9', capacity: 20, isActive: true },
      { id: 10, name: 'Classroom 10', capacity: 50, isActive: true }
    ];
    return of(mockClassrooms);
  }

  getMyBookings(): Observable<Booking[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return of(this.mockBookings.filter(b => b.userName === (currentUser.username || 'admin')));
  }

  createBooking(booking: any): Observable<any> {
    const classroomName = `Classroom ${booking.classroomId}`;
    const newBooking: Booking = {
      id: Date.now(),
      classroomId: parseInt(booking.classroomId),
      classroomName: classroomName,
      startTime: booking.startTime,
      endTime: booking.endTime,
      purpose: booking.purpose,
      status: 'Active',
      userName: JSON.parse(localStorage.getItem('currentUser') || '{}').username || 'admin'
    };
    
    this.mockBookings.push(newBooking);
    
    return of({ success: true, message: 'Booking created successfully', bookingId: newBooking.id }).pipe(
      delay(500)
    );
  }

  cancelBooking(bookingId: number): Observable<any> {
    const index = this.mockBookings.findIndex(b => b.id === bookingId);
    if (index > -1) {
      this.mockBookings.splice(index, 1);
    }
    
    return of({ success: true, message: 'Booking cancelled successfully' }).pipe(
      delay(300)
    );
  }
}