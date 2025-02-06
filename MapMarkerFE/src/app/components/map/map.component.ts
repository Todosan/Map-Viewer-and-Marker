import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MarkerService, Marker} from '../../services/marker.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MarkerService]
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map!: Map;
  private markerLayer!: VectorLayer<VectorSource>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private markerService: MarkerService) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.markerLayer = new VectorLayer({ source: new VectorSource() });

      this.map = new Map({
        target: this.mapContainer.nativeElement,
        layers: [
          new TileLayer({ source: new OSM() }),
          this.markerLayer
        ],
        view: new View({
          center: fromLonLat([-0.1276, 51.5074]), // Default to London
          zoom: 10
        })
      });

      // Load markers from backend
      this.loadMarkers();

      this.map.on('click', (event) => {
        const coordinates = toLonLat(event.coordinate);
        this.toggleMarker(coordinates[0], coordinates[1]);
      });
    }
  }

  loadMarkers(): void {
    this.markerService.getMarkers().subscribe((markers: Marker[]) => {
      markers.forEach(({ lon, lat }) => this.addMarker(lon, lat));
    });
  }

  toggleMarker(lon: number, lat: number): void {
    const source = this.markerLayer.getSource();
    if (!source) return;

    let existingMarker: Feature | null = null;
    source.getFeatures().forEach(feature => {
      if (Math.abs(feature.get('lon') - lon) < 0.001 && Math.abs(feature.get('lat') - lat) < 0.001) {
        existingMarker = feature;
      }
    });

    if (existingMarker) {
      source.removeFeature(existingMarker);
      this.markerService.deleteMarker(lon, lat).subscribe();
    } else {
      this.addMarker(lon, lat);
      this.markerService.addMarker({ lon, lat }).subscribe();
    }
  }

  addMarker(lon: number, lat: number): void {
    const marker = new Feature({
      geometry: new Point(fromLonLat([lon, lat]))
    });

    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        scale: 1
      })
    }));

    marker.set('lon', lon);
    marker.set('lat', lat);

    this.markerLayer.getSource()?.addFeature(marker);
  }
}
