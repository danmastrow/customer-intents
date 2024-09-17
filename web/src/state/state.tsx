import { atom } from "jotai";

export type CustomerIntent = {
  id: string;
  category: string;
  original_reason: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  status: "Reviewed" | "Unreviewed";
};

export const customerIntentsAtom = atom<CustomerIntent[]>([]);
export const isLoadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
export const unreviewedIntentsAtom = atom((get) =>
  get(customerIntentsAtom).filter((intent) => intent.status === "Unreviewed")
);

export const latestCustomerIntentsAtom = atom((get) => {
  const intents = get(customerIntentsAtom);
  return intents.slice(0, 5);
});

export const categoryAtom = atom((get) => {
  const intents = get(customerIntentsAtom);
  return intents.reduce((acc, intent) => {
    if (acc[intent.category]) {
      acc[intent.category] += 1;
    } else {
      acc[intent.category] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });
});

export const sortedCategoryAtom = atom((get) => {
  const categoryData = get(categoryAtom);
  return Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])
    .map(([_, value]) => value);
});

export const sentimentAtom = atom((get) => {
  const intents = get(customerIntentsAtom);
  return intents.reduce(
    (acc, intent) => {
      if (intent.sentiment === "Positive") {
        acc[0]++;
      } else if (intent.sentiment === "Neutral") {
        acc[1]++;
      } else if (intent.sentiment === "Negative") {
        acc[2]++;
      }
      return acc;
    },
    [0, 0, 0] // [Positive, Neutral, Negative]
  );
});

export const fetchCustomerIntentsAtom = atom(
  (get) => get(isLoadingAtom),
  async (get, set) => {
    set(isLoadingAtom, true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/customer-intents`
      );
      const data = await response.json();
      set(customerIntentsAtom, data);
      set(errorAtom, null);
    } catch (error) {
      console.error(error);
      set(errorAtom, "There was an error loading the customer data data.");
    } finally {
      set(isLoadingAtom, false);
    }
  }
);

// // Component using Jotai atoms
// function CustomerIntentsComponent() {
//   const [customerIntents] = useAtom(customerIntentsAtom);
//   const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
//   const [error] = useAtom(errorAtom);
//   const [, fetchCustomerIntents] = useAtom(fetchCustomerIntentsAtom);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchCustomerIntents();
//   }, [fetchCustomerIntents]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       {customerIntents.map((intent) => (
//         <div key={intent.id}>{intent.name}</div>
//       ))}
//     </div>
//   );
// }

// export default CustomerIntentsComponent;
