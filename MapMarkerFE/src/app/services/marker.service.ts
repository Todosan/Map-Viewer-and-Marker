import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marker {
  id?: number;
  lon: number;
  lat: number;
}

@Injectable({
  providedIn: 'root' // Ensures service is available globally
})
export class MarkerService {
  private apiUrl = 'http://localhost:5000/api/markers'; // Adjust this if needed

  constructor(private http: HttpClient) {} // Ensure HttpClient is injected

  getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.apiUrl);
  }

  addMarker(marker: Marker): Observable<Marker> {
    return this.http.post<Marker>(this.apiUrl, marker);
  }
  deleteMarker(lon: number, lat: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/markers`, {
      body: { lon, lat }, // Send both lon and lat in the request body
    });
  }  
}
