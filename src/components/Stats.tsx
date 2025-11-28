import {
  eventNeeder,
  eventPlanner,
  serviceProvider,
  succesfulBooking,
} from "assets";

type Stat = {
  Icon?: string;
  id: number;
  name: string;
  value: string;
};

const stats: Stat[] = [
  { id: 1, name: "Event Needers", value: "13k+", Icon: eventNeeder },
  { id: 2, name: "Service Providers", value: "4.5k+", Icon: serviceProvider },
  { id: 3, name: "Event Planners", value: "3k+", Icon: eventPlanner },
  {
    id: 4,
    name: "Successful Bookings",
    value: "34.5k",
    Icon: succesfulBooking,
  },
];

export default function Stats(): JSX.Element {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto bg-cream p-6 lg:p-12 lg:py-20">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-4 justify-center"
            >
              {stat.Icon && <img src={stat.Icon} alt="" />}
              <div className="flex max-w-xs flex-col gap-y-4">
                <dt className="text-base md:text-xl leading-7 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-[40px] font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
