# chatApp-nextjs

A modern real-time chat application built with the PERN stack (PostgreSQL, Express, React, Node.js), using Next.js and TypeScript for the frontend.

[Live Demo](https://chat-app-nextjs-eight.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- ⚡ Real-time messaging with WebSockets
- 🔒 Secure authentication and user management
- 🗂️ Scalable project structure using Next.js
- 🎨 Modern UI/UX with TypeScript and React
- 🗄️ Persistent chat history with PostgreSQL

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Deployment:** Vercel (for frontend), Docker (optional for backend)

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codeitout32/chatApp-nextjs.git
   cd chatApp-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**

   Create a `.env.local` file in the root directory with the following (adjust as required):

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   SECRET_KEY=your_secret_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
chatApp-nextjs/
├── components/      # Reusable React components
├── pages/           # Next.js routes
├── api/             # Backend API routes (Next.js API routes or custom server)
├── public/          # Static assets
├── utils/           # Utility functions
├── styles/          # CSS/SCSS files
├── .env.local       # Environment variables
├── package.json
└── tsconfig.json
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

- **codeitout32** - [GitHub](https://github.com/codeitout32)
