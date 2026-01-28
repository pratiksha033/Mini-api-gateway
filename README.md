# Distributed API Gateway & Service Mesh
### A fault-tolerant, load-balanced API Gateway built with Node.js, Redis, and Microservices

This project demonstrates the design and implementation of a distributed API Gateway that manages authentication, rate limiting, service discovery, load balancing, caching, and fault tolerance for multiple backend microservices.
## Tech Stack
- Node.js, Express.js
- Redis (Service Registry, Caching)
- Docker (Local Infrastructure)
- React (Observability Dashboard)
- Axios
## Key Features
- Centralized API Gateway for all client requests
- Redis-backed dynamic service discovery
- Round-robin load balancing across multiple service instances
- Circuit breaker and cache-based fallback for fault tolerance
- Distributed tracing using correlation IDs
- Lightweight frontend dashboard for system observability

## How to Run Locally
1. Start Redis using Docker
2. Run multiple instances of order-service on different ports
3. Start the API Gateway
4. Start the React frontend
5. Access the dashboard at http://localhost:5173
