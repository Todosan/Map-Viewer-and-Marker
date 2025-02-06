import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';  // Adjust the path as needed

@Component({
  selector: 'app-root',
  standalone: true,          // Ensure this is a standalone component
  imports: [MapComponent],   // Import your MapComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map';
}
