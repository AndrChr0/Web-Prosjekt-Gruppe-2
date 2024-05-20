# Sustainability Diary

Welcome to the Sustainability Diary, your new space for growth and reflection on sustainability!

## About

The Sustainability Diary is a platform created as part of NTNU's initiative to integrate sustainability into education. This platform offers a unique opportunity for users to document, reflect, and share their sustainability journeys. Whether you're a student exploring your thoughts and projects, or a teacher guiding the next generation, the Sustainability Diary is designed to foster a deeper understanding of sustainability practices.

## Features

- **Document Your Journey**: Track your sustainability projects and thoughts.
- **Reflect and Share**: Reflect on your progress and share insights with the community.
- **Community Engagement**: Become part of a community dedicated to making a difference.
- **Educational Support**: Tools and resources for both students and teachers to enhance sustainability education.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/AndrChr0/Web-Prosjekt-Gruppe-2.git
    ```

2. **Setup Environment Variables:**

    - **Backend**: Create a `.env` file in the `backend` directory and add the necessary environment variables:

        ```env
        JWT_SECRET=your_jwt_secret
        PORT=[NNNN]
        MONGO_URI=your_mongo_uri
        ```

    - **Frontend**: Create a `.env` file in the `frontend` directory and add the necessary environment variables:

        ```env
        VITE_URL=http://localhost:[NNNN]
        ```

3. **Start the services:**

    ```sh
    docker-compose up -d
    ```

## Usage

Once the services are up and running, visit [Sustainability Diary](https://team2.sustainability.it.ntnu.no/) to start your sustainability journey. Please note that you are exploring the beta version of our site, where we're still fine-tuning features and not all functionalities are fully implemented yet.

## Project Structure

- **backend**: Contains the backend code, including the server setup, routes, and database models.
- **frontend**: Contains the frontend code, including the React application and related assets.

## Contributing

We welcome contributions to improve the Sustainability Diary! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## Acknowledgements

- This platform is part of NTNU's initiative to integrate sustainability into education.


