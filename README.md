Batman Panic Button
A React-based emergency alert system for authorized personnel to contact emergency services during critical situations.

Features
Secure Authentication - JWT-based login system

Emergency Panic Button - One-click alert system with location tracking

Alert Management - View and cancel active emergencies

History Tracking - Complete audit trail of all alerts

Responsive Design - Works on desktop and mobile devices

Modern UI - Clean, professional interface with dark theme

Tech Stack
React - Frontend framework

React Router - Navigation and routing

Tailwind CSS - Styling and design

Axios - HTTP client for API requests

React Hot Toast - Notifications

React Icons - Icon library

Getting Started
Prerequisites
Node.js 16.0 or higher

npm or yarn

Installation
Install dependencies:
npm install

Start the development server:
npm run dev

Open http://localhost:5173 to view the app in your browser.

Project Structure
src/
├── components/ # Reusable UI components
│ ├── panic/ # Panic-related components
│ ├── layout/ # Layout components
├── contexts/ # React contexts
├── pages/ # Page components
├── services/ # API services


Usage
For Authorized Users only


Send Emergency Alert:

Click the red panic button

Allow location access when prompted

Provide emergency details

Submit to notify emergency services immediately

Manage Alerts:

View alert history in the History tab

Cancel active alerts if situation is resolved

Filter alerts by status

Status Types
In Progress - Alert active, response underway

Cancelled - Alert cancelled by user

Resolved - Situation resolved

