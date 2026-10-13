# Event Management App

A Next.js application for discovering developer events. Visitors can browse the latest events, view event details and similar events. Event data is stored in MongoDB, and event images are uploaded to Cloudinary.

## Features

- Homepage with a list of recently created events
- Dynamic event detail pages at `/events/[slug]`
- Related-event recommendations based on shared tags
- API routes for listing, retrieving, and creating events
- MongoDB models for events and bookings
- Cloudinary image uploads and optimized remote images

> **Booking status:** The event page currently shows a demo sign-up form. Submitting it displays a thank-you message, but does not create a booking or send the email to a service.

## Tech stack

- Next.js 16 with the App Router and React 19
- TypeScript
- MongoDB with Mongoose
- Cloudinary
- Tailwind CSS 4

## Requirements

- Node.js compatible with the versions required by Next.js 16
- npm
- A MongoDB database
- A Cloudinary account for creating events with uploaded images

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set the values:

   ```dotenv
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
   ```

   `MONGODB_URI` is required to read or write events. `CLOUDINARY_URL` is required for event creation and image uploads. Keep the Cloudinary URL private and do not commit `.env`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The homepage and detail pages read event records from MongoDB. To add events, use the create-event API described below.

## API

| Method | Endpoint             | Description                                                                    |
| ------ | -------------------- | ------------------------------------------------------------------------------ |
| `GET`  | `/api/events`        | Returns events, newest first.                                                  |
| `GET`  | `/api/events/[slug]` | Returns the event matching the URL slug.                                       |
| `POST` | `/api/events`        | Creates an event from multipart form data and uploads its image to Cloudinary. |

### Create an event

Send `multipart/form-data` to `/api/events`. Include these fields:

| Field         | Format                                                       |
| ------------- | ------------------------------------------------------------ |
| `title`       | Text                                                         |
| `description` | Text                                                         |
| `overview`    | Text                                                         |
| `image`       | Image file                                                   |
| `venue`       | Text                                                         |
| `location`    | Text                                                         |
| `date`        | Date string                                                  |
| `time`        | `HH:MM` or a time such as `7:30 PM`                          |
| `mode`        | `online`, `offline`, or `hybrid`                             |
| `audience`    | Text                                                         |
| `agenda`      | JSON array of strings, for example `["Talks", "Networking"]` |
| `organizer`   | Text                                                         |
| `tags`        | JSON array of strings, for example `["JavaScript", "Web"]`   |

The event slug is generated from its title. For example, using `curl`:

```bash
curl -X POST http://localhost:3000/api/events \
  -F 'title=JavaScript Meetup' \
  -F 'description=An evening for JavaScript developers.' \
  -F 'overview=Talks and networking with the local community.' \
  -F 'image=@./event-banner.png' \
  -F 'venue=Community Hall' \
  -F 'location=Jakarta' \
  -F 'date=2026-11-15' \
  -F 'time=18:30' \
  -F 'mode=offline' \
  -F 'audience=Developers' \
  -F 'agenda=["Welcome","Lightning talks","Networking"]' \
  -F 'organizer=Dev Community' \
  -F 'tags=["JavaScript","Community"]'
```
