🌍 Map Marker Project

📌 Overview

  This project is a full-stack web application that allows users to add, remove, and store map markers using OpenLayers on the frontend (Angular) and a .NET Core 5.0 backend for persistence.

🚀 Features

  🗺️ Interactive Map: Users can click to place and remove markers.
  
  💾 Persistent Storage: Markers are stored in a database using a .NET Core 5.0 API.
  
  🔄 Automatic Syncing: Markers load from the backend on app startup.
  
  ⚡ Efficient Data Handling: Uses Angular services and Entity Framework Core for optimized performance.

🏗️ Tech Stack

  Frontend (Angular + OpenLayers)
  
  Angular (Standalone Components)
  
  OpenLayers (Map rendering)
  
  HttpClient (API communication)
  
  Backend (.NET Core 5.0)
  
  ASP.NET Core Web API
  
  Entity Framework Core
  
  SQL Database (SQL Server/PostgreSQL)

🛠️ Installation & Setup

  1️⃣ Clone the Repository

      git clone https://github.com/your-repo-name.git
      cd MapMarkerProject

  2️⃣ Setup Backend (.NET Core 5.0)

    Install Dependencies

    dotnet restore
    
    Run the Backend
    
    dotnet run
    
    Backend runs on: http://localhost:5000

  3️⃣ Setup Frontend (Angular)

    Install Dependencies
    
    npm install
    
    Run the Frontend
    
    ng serve

    Frontend runs on: http://localhost:4200

🏗️ Project Structure

  Frontend (Angular)

    📂 src/app/
    
    📌 map.component.ts → Displays the map & handles marker interactions.
    
    📌 marker.service.ts → Manages API requests for markers.
    
    📌 main.ts → Bootstraps the Angular application.

  Backend (.NET Core 5.0)

    📂 MapMarkerAPI/
    
    📌 MarkersController.cs → API endpoints to handle markers.
    
    📌 Marker.cs → Defines the marker model.
    
    📌 ApplicationDbContext.cs → Database connection setup.
    
    🔥 API Endpoints

1️⃣ Get All Markers

  GET /api/markers
    
   ✅ Response:

    [
      { "id": 1, "lon": -0.1276, "lat": 51.5074 },
      { "id": 2, "lon": -74.006, "lat": 40.7128 }
    ]

  2️⃣ Add a Marker

  POST /api/markers
  Content-Type: application/json

  ✅ Body:

    {
      "lon": -73.935242,
      "lat": 40.73061
    }

  3️⃣ Delete a Marker

      DELETE /api/markers/{id}

  🛠️ Troubleshooting

  Common Issues & Fixes

    🔴 NullInjectorError: No provider for HttpClient! → Ensure provideHttpClient() is in main.ts.
    
    🔴 ToListAsync() not found → Add using Microsoft.EntityFrameworkCore; in MarkersController.cs.
    
    🔴 API not working? → Check dotnet run logs for errors.

🤝 Contributing

  Pull requests are welcome! Please create an issue before making major changes.

  Happy coding! 🎯🚀

