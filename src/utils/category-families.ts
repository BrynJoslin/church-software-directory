export const categoryFamilies = [
  {
    name: "Church administration and people",
    description: "Shared records, communication, children and day-to-day church administration.",
    categories: [
      "church-management",
      "pastoral-care",
      "safeguarding",
      "childrens-ministry",
      "volunteer-scheduling",
      "church-communications"
    ]
  },
  {
    name: "Finance, giving and bookings",
    description: "Giving, charity finance and practical event or booking workflows.",
    categories: ["church-accounting", "online-giving", "events-ticketing", "room-bookings"]
  },
  {
    name: "Services, worship and media",
    description: "Planning services, presenting content and sharing worship or teaching.",
    categories: ["worship-planning", "presentation-software", "livestreaming", "sermon-hosting"]
  },
  {
    name: "Websites, communication and discipleship",
    description: "Public-facing church information and resources for learning and discipleship.",
    categories: ["church-websites", "church-mobile-apps", "bible-study"]
  }
] as const;

export const categoryFamilyFor = (categoryId: string) =>
  categoryFamilies.find((family) => family.categories.includes(categoryId as never));
