# API Documentation

## Overview

This API provides functionalities for user management, brand management, and banner management with authentication and authorization using role-based access control (RBAC).

---

## Table of Contents

1. [Authentication](#authentication)
2. [Authorization](#authorization)
3. [Users CRUD](#users-crud)
4. [Brands CRUD](#brands-crud)
5. [Banners CRUD](#banners-crud)
6. [API Endpoints](#api-endpoints)
7. [Examples](#examples)
8. [Error Handling](#error-handling)

---

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To authenticate, send a POST request to `/api/auth/login` with the following JSON payload:
