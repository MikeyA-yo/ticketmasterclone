export type Seat = {
  type: string;
  section: string;
  row: string;
  seat: string;
  price?: number;
};

export type TicketOrder = {
  id: string;
  status: "upcoming" | "past";
  /** Display order reference, e.g. "75-19711/NY2" (rendered as "Order #…"). */
  orderNumber?: string;
  event: {
    name: string;
    date: string;
    venue: string;
    city: string;
    image: string;
    count: number;
  };
  seats: Seat[];
  transferStatus?: string;
};

export const orders: TicketOrder[] = [
  {
    id: "ariana-eternal-sunshine",
    status: "upcoming",
    orderNumber: "75-19711/NY2",
    event: {
      name: "Ariana Grande - The Eternal Sunshine Tour",
      date: "THU, JUL 23, 2026 • 8:00 PM",
      venue: "TD Garden",
      city: "Boston, MA",
      image: "/images/ariana.jpg",
      count: 32,
    },
    seats: [
      { type: "Verified Resale Ticket", section: "BAL313", row: "14", seat: "6", price: 805 },
      { type: "Verified Resale Ticket", section: "BAL313", row: "14", seat: "7", price: 805 },
    ],
    transferStatus: "Transfer Accepted",
  },
  {
    id: "coldplay-spheres",
    status: "past",
    orderNumber: "68-40233/NJ1",
    event: {
      name: "Coldplay - Music of the Spheres",
      date: "SAT • SEP 14, 2025 • 7:00 PM",
      venue: "MetLife Stadium",
      city: "East Rutherford, NJ",
      image: "/images/concert-1.jpg",
      count: 2,
    },
    seats: [{ type: "General Admission", section: "GA", row: "—", seat: "—" }],
  },
  {
    id: "lakers-celtics",
    status: "past",
    orderNumber: "71-55820/CA3",
    event: {
      name: "Lakers vs. Celtics",
      date: "FRI • JAN 17, 2025 • 5:30 PM",
      venue: "Crypto.com Arena",
      city: "Los Angeles, CA",
      image: "/images/sports-1.jpg",
      count: 2,
    },
    seats: [
      { type: "Standard", section: "114", row: "12", seat: "5" },
      { type: "Standard", section: "114", row: "12", seat: "6" },
    ],
  },
  {
    id: "hamilton",
    status: "past",
    orderNumber: "63-10947/NY1",
    event: {
      name: "Hamilton",
      date: "WED • NOV 6, 2024 • 7:30 PM",
      venue: "Richard Rodgers Theatre",
      city: "New York, NY",
      image: "/images/theater-1.jpg",
      count: 2,
    },
    seats: [
      { type: "Orchestra", section: "ORCH", row: "H", seat: "101" },
      { type: "Orchestra", section: "ORCH", row: "H", seat: "102" },
    ],
  },
];

export function getOrder(id: string): TicketOrder | undefined {
  return orders.find((o) => o.id === id);
}
