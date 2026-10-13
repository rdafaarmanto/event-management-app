import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreButton";
import { IEvent } from "@/database";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsList = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);

  if (!response.ok) throw new Error("Failed to fetch events.");

  const { events } = await response.json();

  return (
    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {events &&
          events.length > 0 &&
          events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss.
      </h1>
      <p className="text-center mt-5">
        Hackatons, meetups and conferences all in one place.
      </p>
      <ExploreButton />
      <Suspense fallback={<p>Loading events...</p>}>
        <EventsList />
      </Suspense>
    </section>
  );
};
export default Page;
