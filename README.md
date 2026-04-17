# ARU API Tester

An interactive, full-featured API testing interface (Postman alternative) for the ARU Backend API built with React and Vite.

## Features

### Core Functionality
- 🔐 **Authentication Management** - Multi-role login (Super Admin, Admin, Doctor)
- 📡 **Full Request Builder** - Support for GET, POST, PUT, DELETE, PATCH
- 📊 **Response Viewer** - Real-time responses with syntax highlighting
- 💾 **Request History** - Automatic tracking of last 10 requests
- ⭐ **Favorites** - Save and quickly access frequently used requests
- 🔄 **Token Management** - Auto-refresh on 401, localStorage persistence
- 🌍 **Environment Switching** - Dev/Production environment toggle
- 🔍 **Search & Filter** - Find endpoints by name or path, filter by favorites
- 📋 **Pre-filled Examples** - Load example requests for all endpoints

### Technical Features
- ✅ Split-pane layout (Request left, Response right)
- ✅ Headers, Body, and Params tabs
- ✅ Color-coded HTTP methods
- ✅ Response time and size tracking
- ✅ Copy response to clipboard
- ✅ Collapsible response headers
- ✅ Status code color coding
- ✅ Persistent state with localStorage

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup Steps

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

3. **Build for production**
```bash
npm run build
```

## Quick Start

### 1. Login
The app opens with a login modal featuring:
- **Quick Login** - Pre-configured credentials for testing
  - Super Admin: `superadmin@example.com` / `Admin@123456`
  - Admin: `admin@example.com` / `Admin@123456`
  - Doctor: `hassan@example.com` / `Doctor@123456`
- **Custom Login** - Enter any credentials

### 2. Browse Endpoints
The left sidebar displays all API endpoints organized by category:
- Admin Auth
- Doctor Auth
- Administrations
- Centers
- Faculties
- Departments
- Events
- Posts
- Achievements

### 3. Select an Endpoint
Click any endpoint to populate:
- HTTP method
- Full URL
- Any available example request body

### 4. Load Example (Optional)
Click "Load Example" to auto-populate request body with example JSON

### 5. Configure Request
- **Headers Tab** - Add custom headers (Key: Value format)
- **Body Tab** - Edit JSON request body
- **Params Tab** - Add query parameters (key=value format)

### 6. Send Request
Click the blue "Send" button to execute the request

### 7. View Response
Right panel displays:
- Status code (color-coded)
- Response time (ms)
- Response size (bytes)
- Response headers (collapsible)
- Formatted JSON response
- Copy button

## Usage Guide

### Search Endpoints
1. Click the search box in the sidebar
2. Type endpoint name or path
3. Results filter in real-time

### Filter by Favorites
1. Click the "Favorites" filter button
2. Shows only favorited endpoints
3. Click star icon on any endpoint to favorite

### View Request History
1. Click the clock icon in sidebar header
2. "History" tab shows last 10 requests
3. Click "Load" to re-use any request
4. Click copy icon to duplicate request

### Save Favorites
1. Hover over any endpoint
2. Click the star icon
3. Star fills with yellow
4. Access from "Favorites" tab in history panel
5. Remove by clicking star again

### Environment Switching
1. Look for floating "Environment" widget (bottom-right)
2. Click "Development" or "Production"
3. Base URL updates automatically
4. All subsequent requests use new environment

### Auto Token Refresh
- System automatically refreshes expired tokens (401 responses)
- New token is injected and request is retried
- Manual logout available via sidebar

## API Endpoints Reference

### Authentication
- `POST /auth/admins/login` - Admin login
- `POST /auth/admins/register` - Create admin (Super Admin only)
- `POST /auth/admins/refresh` - Refresh token
- `POST /auth/admins/logout` - Logout
- `POST /auth/doctors/login` - Doctor login
- `POST /auth/doctors/register` - Register doctor
- `POST /auth/doctors/refresh` - Refresh doctor token

### Administrations
- `GET /administrations` - List all
- `GET /administrations/:id` - Get details
- `POST /administrations` - Create
- `PUT /administrations/:id` - Update
- `DELETE /administrations/:id` - Delete

### Other Resources
- Centers, Faculties, Departments, Events, Posts, Achievements

*For full endpoint details, see ENDPOINTS_TEST.md*

## Architecture

### State Management (Zustand)
- Global store handles: auth state, current request, response, history, favorites
- Persistent state with localStorage
- Zero-boilerplate action creators

### Components
- `App.jsx` - Main container
- `AuthModal.jsx` - Login interface
- `Sidebar.jsx` - Endpoint browser
- `RequestPanel.jsx` - Request builder
- `ResponsePanel.jsx` - Response viewer
- `HistoryPanel.jsx` - History & favorites
- `EnvironmentSwitcher.jsx` - Environment toggle

### Styling
- Tailwind CSS for all styling
- Responsive design
- Dark syntax highlighting for JSON

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### "Login Failed" Error
- Verify backend server is running on localhost:3000
- Check credentials are correct
- Try switching to custom login if quick login fails

### Token Expired
- Automatic refresh will occur on next request
- Manual logout and re-login available

### CORS Issues
- Ensure backend has CORS enabled for localhost:5173
- Check that base URL is correct in environment switcher

### Empty Response
- Check that endpoint path is correct
- Verify authorization header for protected endpoints
- Check request body format for POST/PUT requests

## Project Structure

```
src/
├── components/
│   ├── App.jsx
│   ├── AuthModal.jsx
│   ├── Sidebar.jsx
│   ├── RequestPanel.jsx
│   ├── ResponsePanel.jsx
│   ├── HistoryPanel.jsx
│   └── EnvironmentSwitcher.jsx
├── data/
│   └── endpoints.js          # All endpoints configuration
├── api.js                     # API client with auto-refresh
├── store.js                   # Zustand state management
├── utils.js                   # JSON formatting utilities
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## Configuration Files

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `package.json` - Dependencies and scripts

## Performance

- **Fast Load Time** - Vite HMR for instant updates
- **Efficient State** - Zustand minimizes re-renders
- **Optimized Requests** - Single API client instance
- **Response Caching** - Browser caches non-sensitive data

## Contributing

To add new endpoints:
1. Update `src/data/endpoints.js`
2. Add endpoint with method, path, and example
3. Sidebar will automatically include it

## License

MIT

## Support

For issues or feature requests, please refer to the ENDPOINTS_TEST.md documentation or the backend API documentation.

---

**Built with React, Vite, Tailwind CSS, and Zustand**

Version 1.0.0 | April 16, 2026
