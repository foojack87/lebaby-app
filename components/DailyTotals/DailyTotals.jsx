const DailyTotals = ({ users }) => {
  // Logic for activity data and date data

  const data = users.activity;
  const today = new Date(); // get the current date
  const todayISO = new Date().toISOString().substring(0, 10); // get today's date in ISO format
  console.log(todayISO);

  // logic for pump data

  const pumpsToday = data?.filter(
    (item) =>
      item.title.includes('Pumped') &&
      new Date(item.start).toDateString() === today.toDateString()
  );
  console.log(pumpsToday);

  let totalPumpedMl = 0;
  for (let i = 0; i < pumpsToday?.length; i++) {
    const pump = pumpsToday[i];
    const pumpMl = parseInt(pump.title.match(/\d+/)); // Extracts the number from the title
    totalPumpedMl += pumpMl;
  }

  // logic for bottle fed data

  const bottleToday = data?.filter(
    (item) =>
      item.title.includes('Bottle') &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  let totalBottleFedMl = 0;
  for (let i = 0; i < bottleToday?.length; i++) {
    const bottle = bottleToday[i];
    const bottleMl = parseInt(bottle.title.match(/\d+/)); // Extracts the number from the title
    totalBottleFedMl += bottleMl;
  }

  console.log(totalBottleFedMl);
  console.log(bottleToday);

  // logic for total times fed

  const fed = data?.filter(
    (item) =>
      item.title.includes('fed') &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(fed);

  // logic for total nap time today

  const napsToday = data?.filter(
    (item) =>
      item.title.includes('Nap') &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(napsToday);

  let totalNapMinutes = 0;

  napsToday?.forEach((nap) => {
    const napDurationMs = new Date(nap.end) - new Date(nap.start);
    const napDurationMinutes = napDurationMs / 1000 / 60;
    totalNapMinutes += napDurationMinutes;
  });

  console.log(totalNapMinutes);

  // filter the data array to get only the items with the "poop" title that occurred on the current date
  const poopsToday = data?.filter(
    (item) =>
      item.title.toLowerCase() === 'poop' &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(`Number of poops today: ${poopsToday?.length}`);

  // Logic for calculating amount of times peed today
  const peesToday = data?.filter(
    (item) =>
      item.title.toLowerCase() === 'pee' &&
      new Date(item.start).toDateString() === today.toDateString()
  );

  console.log(peesToday);

  return (
    <>
      <div className="lg:flex-row rounded-xl w-[18rem] h-[20rem] items-center justify-center mx-auto shadow-lg relative p-6">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-bold border-b-2 border-violet-500 text-center uppercase">
          Totals for Today
        </h1>
        <div className="flex flex-col gap-2 py-4 ml-8">
          <p>
            Nap:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {totalNapMinutes} mins
            </span>
          </p>
          <p>
            Feedings:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {fed?.length > 0 ? fed.length : 0}
              {fed?.length === 1 ? ' time' : ' times'}
            </span>
          </p>
          <p>
            Bottle Fed:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {totalBottleFedMl}ml
            </span>
          </p>
          <p>
            Pooped:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {poopsToday?.length > 0 ? poopsToday?.length : 0}
              {poopsToday?.length === 1 ? ' time' : ' times'}
            </span>
          </p>
          <p>
            Peed:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {peesToday?.length > 0 ? peesToday?.length : 0}
              {peesToday?.length === 1 ? ' time' : ' times'}
            </span>
          </p>
          <p>
            Pumped:
            <span className="font-bold text-xl ml-4 text-violet-500">
              {totalPumpedMl}ml
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DailyTotals;
