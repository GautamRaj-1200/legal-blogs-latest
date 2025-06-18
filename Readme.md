# Legal Blogs - A Modern Full-Stack Blogging Platform

Legal Blogs is a feature-rich, full-stack blogging platform designed for legal professionals. It provides a seamless and intuitive experience for creating, managing, and sharing legal articles and insights. The platform is built with a modern tech stack, ensuring performance, scalability, and security.

## ✨ Features

### Client (Frontend)

- **Modern UI:** A clean, responsive, and intuitive user interface built with React and Vite.
- **Rich Text Editor:** A powerful WYSIWYG editor (React Quill) for creating and editing blog posts with rich formatting options.
- **State Management:** Centralized state management with Redux Toolkit for a predictable and maintainable application state.
- **Routing:** Seamless client-side routing with React Router for a smooth single-page application (SPA) experience.
- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Notifications:** User-friendly notifications with React Toastify for a better user experience.
- **Icons:** A rich set of icons from Font Awesome and React Icons.
- **API Communication:** Efficient data fetching from the backend using Axios.

### Server (Backend)

- **Robust API:** A powerful and secure RESTful API built with Node.js and Express.
- **Database:** MongoDB with Mongoose for flexible and scalable data storage.
- **Authentication & Authorization:** Secure user authentication with JSON Web Tokens (JWT) and password hashing with bcrypt.
- **File Uploads to AWS S3:** Secure and efficient file uploads handled by Multer and stored on AWS S3.
- **Data Validation:** Robust data validation with Zod to ensure data integrity.
- **Middleware:** Essential middleware for handling CORS, cookies, and rate limiting.
- **Email Service:** Integrated email service with Nodemailer for user notifications and communication.
- **Environment Management:** Easy environment variable management with `dotenv-flow`.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, React Router, Axios, React Quill, Tailwind CSS (or other CSS framework if present)
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, AWS S3, Zod, Nodemailer
- **Development:** TypeScript, ESLint, Prettier, Husky, lint-staged, Vitest

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/f578def1-3443-4fe0-85d0-fb688944aa8c)


## 📦 Project Structure

The project is organized as a monorepo, with the frontend and backend code in separate packages:

```
/
├── app/         # Backend (Node.js/Express)
├── client/      # Frontend (React/Vite)
└── package.json # Root package.json
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- MongoDB instance (local or remote)
- AWS S3 bucket and credentials

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/legal-blogs-latest.git
    cd legal-blogs-latest
    ```

2.  **Install dependencies in `app` as well as `client` folder:**

    ```bash
    pnpm install
    ```

3.  **Configure environment variables:**

    -   Create a `.env` file in the `app` directory.
    -   Add the following environment variables:

        ```
        # app/.env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        AWS_ACCESS_KEY_ID=your_aws_access_key
        AWS_SECRET_ACCESS_KEY=your_aws_secret_key
        AWS_REGION=your_aws_region
        S3_BUCKET_NAME=your_s3_bucket_name
        ```

4.  **Run the development servers:**

    -   **Backend:**

        ```bash
        pnpm --prefix app dev
        ```

    -   **Frontend:**

        ```bash
        pnpm --prefix client dev
        ```

5.  **Open the application:**

    Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## 📄 License

This project is licensed under the ISC License.
