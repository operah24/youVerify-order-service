# E-Commerce Microservices Platform

## About

This project implements an e-commerce platform using two interdependent microservices:

1. Inventory Service: Manages items and stock.
2. Order Service: Handles customer orders, ensuring items are in stock.

The services communicate asynchronously via RabbitMQ for event-based communication, are containerized with Docker, and log stock updates in Elasticsearch.

## Technologies Used

1. Node.js (TypeScript) - Runtime
2. MongoDB - Primary database
3. RabbitMQ - Message broker for event-based communication
4. Elasticsearch - Logging service for tracking stock updates
5. Docker & Docker Compose - Containerization

## Setup Instructions

# Prerequisites

Node.js and npm installed

Docker and Docker Compose installed

MongoDB instance running (can be configured to run as a container)

## Running the Services

1. Clone the Repository:

```bash
git clone <repository-url>
cd e-commerce-platform
```

2. Configure Environment Variables:

Create .env files in both inventory-service and order-service directories.

3. Docker Compose Setup: Use the provided docker-compose.yml file to start the services and dependencies:

```bash
docker-compose up --build
```

4. Verify: Once all containers are running, verify the services are live at:

Inventory Service: http://localhost:3009

Order Service: http://localhost:3000

## Environment Variables

Each service requires its own set of environment variables. Below is an example of necessary variables:

### Inventory Service .env

PORT=

MONGODB_URI=

RABBITMQ_URI=

### Order Service .env

PORT=

MONGODB_URI=

RABBITMQ_URI=

ELASTICSEARCH_URI=

# Usuage
## Inventory Service

Add Item: POST inventory/item - Add a new item with initial stock details.

Deduct Stock: PUT inventory/item/:id/deductStock - Deduct the stock of an item.

Add Stock: PUT inventory/item/:id/addStock - Add to stock of an item.

Get Item Stock: GET inventory/item/:id - Retrieve the stock level of a specific item.

## Order Service

Create Order: POST order/create - Place an order for an item.

Fetch Order Details: GET /order/:id - Retrieve details of an order.

## Event Communication
Event-based communication between the services uses RabbitMQ. Each service publishes or subscribes to specific events, making them decoupled and asynchronously linked.

Stock Update Events:

Publisher: Inventory Service

Consumer: Order Service

Purpose: Order Service listens to stock changes to keep logs up-to-date and verify stock on order placement.

Order Events:

Purpose:Order Service makes an http call to inventory service on new orders and verifies or updates stock levels.

## Testing
```bash
npm test
```

## Domain-Driven Design
This application follows domain-driven design (DDD) principles, ensuring each service has clearly defined roles, responsibilities, and boundaries. DDD is reflected in the following design choices:

Inventory Bounded Context: The Inventory Service owns the item stock management and publishes events for any stock changes.

Order Bounded Context: The Order Service is responsible for handling customer orders and queries stock availability from the Inventory Service.

Event Communication Layer: Implements a messaging layer via RabbitMQ to facilitate domain event sharing without direct dependency between services.

For additional questions or further development, please refer to the CONTRIBUTING.md file.