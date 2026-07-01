export type Seat = {
  type: string;
  section: string;
  row: string;
  seat: string;
};

export type TicketOrder = {
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

export const myOrder: TicketOrder = {
  event: {
    name: "Ariana Grande - The Eternal Sunshine Tour",
    date: "MON • AUG 03, 2026 • 8:00 PM",
    venue: "United Center",
    city: "Chicago, IL",
    image: "/images/fav-1.jpg",
    count: 32,
  },
  seats: [
    { type: "Artist Presale", section: "SEC9", row: "2", seat: "7" },
    { type: "Artist Presale", section: "SEC9", row: "2", seat: "8" },
  ],
  transferStatus: "Transfer Accepted",
};
