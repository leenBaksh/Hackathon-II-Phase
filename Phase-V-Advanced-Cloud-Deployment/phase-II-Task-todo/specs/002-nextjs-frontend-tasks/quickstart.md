# Quickstart Guide for Next.js Frontend Task Management UI

This guide provides instructions on how to set up and run the Next.js frontend application.

## Prerequisites

- Node.js (v18.x or later)
- npm or Yarn (recommended)
- A running backend API (as defined in Spec 2), accessible at `http://localhost:8000` (default assumption).

## Setup

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

4.  **Configure Environment Variables**:
    Create a `.env.local` file in the `frontend/` directory based on `.env.example` (if provided).
    You will need to configure the backend API URL, for example:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
    NEXT_PUBLIC_MOCKED_USER_ID=<YOUR_MOCKED_UUID> # e.g., a1b2c3d4-e5f6-7890-1234-567890abcdef
    ```

## Running the Development Server

To start the development server:

```bash
npm run dev
# or yarn dev
```

The application will typically be available at `http://localhost:3000`.

## Accessing the Dashboard

Once the development server is running, open your web browser and navigate to `http://localhost:3000`. You should see the task dashboard.

## Interaction

-   The UI will interact with the backend API to fetch, create, update, complete, and delete tasks.
-   Ensure your backend API is running before interacting with the frontend.

## Further Reading

-   Refer to `specs/002-nextjs-frontend-tasks/contracts/api-types.ts` for frontend API type definitions.
-   Consult the `openapi.yaml` from the backend specification for detailed API endpoint documentation.
