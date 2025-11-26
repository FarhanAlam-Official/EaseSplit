# API Documentation

## Overview

EaseSplit is primarily a client-side application with minimal API requirements. However, it includes API routes for email notifications and settlement notifications.

## API Routes

### Send Email API

**Endpoint**: `/api/send-email`

**Method**: `POST`

**Description**: Sends email notifications for expense breakdowns.

**Request Body**:

```json
{
  "to": "recipient@example.com",
  "subject": "Expense Breakdown",
  "html": "<html>Email content here</html>"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response**:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Send Breakdown API

**Endpoint**: `/api/send-breakdown`

**Method**: `POST`

**Description**: Sends detailed expense breakdown via email.

**Request Body**:

```json
{
  "to": "recipient@example.com",
  "groupName": "Group Name",
  "expenses": [],
  "members": []
}
```

### Send Settlement Notification API

**Endpoint**: `/api/send-settlement-notification`

**Method**: `POST`

**Description**: Sends settlement notification to group members.

**Request Body**:

```json
{
  "to": "recipient@example.com",
  "groupName": "Group Name",
  "settlements": []
}
```

## Environment Variables

See [ENVIRONMENT.md](./ENVIRONMENT.md) for configuration details.

## Rate Limits

Currently, there are no rate limits implemented as the application is designed for personal/small group use.

## Authentication

No authentication is required for API routes in the current version. All operations are client-side.

## Error Handling

All API routes follow a consistent error handling pattern:

- **200**: Success
- **400**: Bad Request (invalid input)
- **500**: Internal Server Error

Error responses include descriptive messages to help with debugging.
