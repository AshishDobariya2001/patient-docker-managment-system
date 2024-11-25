# Appointment Management API

This API allows patients to create and manage appointments with doctors. It supports user authentication, role-based access control, and CRUD operations for appointments.

## Features

-   **User Roles**: Patients, Doctors, Admin.
-   **Authentication**: JWT-based authentication for secure access.
-   **Appointment Management**:
    -   **Patients**: Create, view, update, delete their own appointments.
    -   **Doctors**: View and update appointments assigned to them.
    -   **Admin**: Manage all appointments.

## Technologies

-   **Node.js** with **Express.js** for the backend.
-   **MongoDB** with **Mongoose** for data management.
-   **bcrypt** for password hashing.
-   **jsonwebtoken (JWT)** for authentication.

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables (e.g., `JWT_SECRET`, `DB_URI`).
4. Start the server: `npm start`.

## License

This project is licensed under the MIT License.
