export interface Location {
  id: number;
  title: string;
  location: string; // City or region name
  description: string;
  coordinates: [number, number];
  category: "mine" | "smelter" | "office";
  country: string;
  startYear: string;
  products: string[];
  details: string;
}

export const locationData: Location[] = [
  {
    id: 1,
    title: "Aitik Mine",
    location: "Gällivare, Norrbotten County, Sweden",
    description: "Large open-pit copper mine",
    coordinates: [67.0735, 20.9628], // Gällivare, Sweden
    category: "mine",
    country: "Sweden",
    startYear: "1968",
    products: ["Copper", "Gold", "Silver"],
    details: "One of Europe's largest copper mines, located near Gällivare in northern Sweden. The mine primarily produces copper concentrate with gold and silver as valuable by-products."
  },
  {
    id: 2,
    title: "Garpenberg Mine",
    location: "Hedemora, Dalarna County, Sweden",
    description: "Historic underground mine with modern operations",
    coordinates: [60.3083, 16.1929], // Hedemora, Sweden
    category: "mine",
    country: "Sweden",
    startYear: "375 BC (historic), 1972 (modern)",
    products: ["Zinc", "Lead", "Silver", "Gold"],
    details: "One of the oldest mining areas in Sweden with a history dating back to 375 BC. The modern mine opened in 1972 and was acquired by Boliden in 1957. Produces zinc, lead, silver, and gold concentrates."
  },
  {
    id: 3,
    title: "Kevitsa Mine",
    location: "Sodankylä, Lapland, Finland",
    description: "Open-pit nickel and copper mine",
    coordinates: [67.6987, 26.9643], // Sodankylä, Finland
    category: "mine",
    country: "Finland",
    startYear: "2012",
    products: ["Nickel", "Copper", "Gold", "Platinum", "Palladium"],
    details: "Open pit operations began in 2012 and the mine was acquired by Boliden in 2016. Produces nickel and copper concentrates with by-products including gold, platinum, and palladium."
  },
  {
    id: 4,
    title: "Tara Mine",
    location: "Navan, County Meath, Ireland",
    description: "Underground zinc and lead mine",
    coordinates: [53.6500, -6.6833], // Navan, Ireland
    category: "mine",
    country: "Ireland",
    startYear: "1977",
    products: ["Zinc", "Lead"],
    details: "Located in Navan, County Meath, Ireland. One of the largest zinc mines in Europe with lead as a by-product."
  },
  {
    id: 5,
    title: "Zinkgruvan Mine",
    location: "Askersund, Örebro County, Sweden",
    description: "Underground zinc, lead and copper mine",
    coordinates: [58.8123, 15.1277], // Askersund, Sweden
    category: "mine",
    country: "Sweden",
    startYear: "1857",
    products: ["Zinc", "Lead", "Copper", "Silver"],
    details: "Located in Askersund, Örebro County, Sweden. It has been in operation since 1857 producing zinc, lead, copper and silver."
  },
  {
    id: 6,
    title: "Neves-Corvo Mine",
    location: "Castro Verde, Alentejo, Portugal",
    description: "Underground copper and zinc mine",
    coordinates: [37.5983, -7.9633], // Castro Verde, Portugal
    category: "mine",
    country: "Portugal",
    startYear: "1988",
    products: ["Copper", "Zinc", "Lead", "Silver"],
    details: "Located in Castro Verde, Alentejo, Portugal. Producing copper and zinc concentrates since 1988 with lead and silver as by-products."
  },
  {
    id: 7,
    title: "Renström Mine",
    location: "Skellefteå, Västerbotten County, Sweden",
    description: "Underground mine in the Boliden Area",
    coordinates: [64.9215, 20.4500], // Adjusted coordinates
    category: "mine",
    country: "Sweden",
    startYear: "1952",
    products: ["Zinc", "Lead", "Copper", "Gold", "Silver"],
    details: "Part of the Boliden Area mine cluster in Skellefteå, Västerbotten County. Operating since 1952, Renström is an underground mine producing zinc, lead, copper, gold, and silver."
  },
  {
    id: 8,
    title: "Kristineberg Mine",
    location: "Skellefteå, Västerbotten County, Sweden",
    description: "Underground mine in the Boliden Area",
    coordinates: [65.0632, 18.5721], // Skellefteå, Sweden
    category: "mine",
    country: "Sweden", 
    startYear: "1940",
    products: ["Zinc", "Copper", "Gold", "Silver"],
    details: "Part of the Boliden Area mine cluster in Skellefteå, Västerbotten County. Operating since 1940, Kristineberg produces zinc and copper with gold and silver as by-products."
  },
  {
    id: 9,
    title: "Kankberg Mine",
    location: "Skellefteå, Västerbotten County, Sweden",
    description: "Gold mine in the Boliden Area",
    coordinates: [64.9543, 20.1800], // Adjusted coordinates
    category: "mine",
    country: "Sweden",
    startYear: "2012",
    products: ["Gold", "Silver", "Tellurium"],
    details: "Part of the Boliden Area mine cluster in Skellefteå, Västerbotten County. Reopened in 2012, Kankberg primarily produces gold with silver and tellurium as by-products."
  },
  {
    id: 10,
    title: "Rönnskär Smelter",
    location: "Skelleftehamn, Västerbotten County, Sweden",
    description: "Copper smelter and electronic recycling facility",
    coordinates: [64.6735, 21.2323], // Skelleftehamn, Sweden
    category: "smelter",
    country: "Sweden",
    startYear: "1930",
    products: ["Copper", "Zinc Clinker", "Lead", "Precious Metals", "Sulphuric Acid"],
    details: "Operating since 1930, Rönnskär is a copper smelter in Skelleftehamn, Västerbotten County, that also processes electronic waste for metal recovery. Produces copper, zinc clinker, lead, precious metals, and sulphuric acid."
  },
  {
    id: 11,
    title: "Harjavalta Smelter",
    location: "Harjavalta, Satakunta, Finland",
    description: "Copper and nickel smelter",
    coordinates: [61.3146, 22.1331], // Harjavalta, Finland
    category: "smelter",
    country: "Finland",
    startYear: "1945",
    products: ["Copper Cathodes", "Nickel", "Gold", "Silver", "Sulphuric Acid"],
    details: "Located in Harjavalta, Satakunta, Finland. Copper production began in 1945. The smelter produces copper cathodes, nickel, gold, silver, and sulphuric acid."
  },
  {
    id: 12,
    title: "Bergsöe Smelter",
    location: "Landskrona, Skåne County, Sweden",
    description: "Lead smelter focusing on battery recycling",
    coordinates: [55.8730, 12.8312], // Landskrona, Sweden
    category: "smelter",
    country: "Sweden",
    startYear: "1902",
    products: ["Lead", "Aluminium Fluoride"],
    details: "Located in Landskrona, Skåne County, Sweden. Lead smelting since 1902. Specializes in recycling lead from scrap batteries and produces aluminium fluoride."
  },
  {
    id: 13,
    title: "Odda Smelter",
    location: "Odda, Vestland County, Norway",
    description: "Zinc smelter",
    coordinates: [60.0691, 6.5463], // Odda, Norway
    category: "smelter",
    country: "Norway",
    startYear: "1929",
    products: ["Zinc", "Aluminium Fluoride"],
    details: "Located in Odda, Vestland County, Norway. Established in 1929, the smelter produces zinc primarily for the steel industry and aluminium fluoride."
  },
  {
    id: 14,
    title: "Kokkola Smelter",
    location: "Kokkola, Central Ostrobothnia, Finland",
    description: "Zinc smelter",
    coordinates: [63.8376, 23.1321], // Kokkola, Finland
    category: "smelter",
    country: "Finland",
    startYear: "1969",
    products: ["Zinc Alloy", "Sulphuric Acid"],
    details: "Located in Kokkola, Central Ostrobothnia, Finland. Zinc smelting since 1969. Produces zinc alloy primarily for galvanizing and sulphuric acid."
  },
  {
    id: 15,
    title: "Glostrup Office",
    location: "Glostrup, Denmark",
    description: "Boliden Bergsøe office",
    coordinates: [55.6685, 12.3989], // Glostrup, Denmark
    category: "office",
    country: "Denmark",
    startYear: "1962",
    products: ["Sales", "Customer Support", "Recycling Services"],
    details: "Boliden Bergsøe A/S operates here, focusing on sales and customer support for various metal products. The office is known for its expertise in recycling and environmental services. Address: Hvissingevej 116, 2600 Glostrup, Phone: +45 4326 8300"
  },
  {
    id: 16,
    title: "Leamington Spa Office",
    location: "Leamington Spa, England",
    description: "Boliden Commercial UK office",
    coordinates: [52.2912, -1.5386], // Leamington Spa, England
    category: "office",
    country: "United Kingdom",
    startYear: "2004",
    products: ["Sales", "Marketing", "Logistics"],
    details: "Boliden Commercial UK Ltd. handles sales and marketing for metals and by-products. This office plays a crucial role in serving customers in the UK and ensuring reliable deliveries through a network of logistics partners. Address: 7 Clarendon Place, Leamington Spa CV32 5QL, Phone: 01926 833010"
  },
  {
    id: 17,
    title: "Neuss Office",
    location: "Neuss, Germany",
    description: "Boliden Commercial Deutschland office",
    coordinates: [51.1960, 6.6916], // Neuss, Germany
    category: "office",
    country: "Germany",
    startYear: "2003",
    products: ["Sales", "Marketing", "Metals Distribution"],
    details: "Boliden Commercial Deutschland GmbH focuses on sales and marketing of base and precious metals. The office is strategically located to serve customers in Germany and surrounding regions. Address: Stresemannallee 4c, 41460 Neuss, Phone: 02131 7504650"
  },
  {
    id: 18,
    title: "Stockholm Headquarters",
    location: "Stockholm, Sweden",
    description: "Boliden Group headquarters",
    coordinates: [59.3307, 18.0587], // Stockholm, Sweden
    category: "office",
    country: "Sweden",
    startYear: "1924",
    products: ["Corporate Management", "Strategy", "Governance"],
    details: "The headquarters of Boliden Group, this office oversees the company's global operations, including exploration, mining, smelting, and recycling. It is the central hub for strategic planning and corporate governance. Address: Klarabergsviadukten 90, 101 20 Stockholm, Phone: +46 8 610 15 00"
  },
  {
    id: 19,
    title: "Boliden Office",
    location: "Boliden, Sweden",
    description: "Regional mining operations office",
    coordinates: [64.8647, 20.3860], // Boliden, Sweden
    category: "office",
    country: "Sweden",
    startYear: "1924",
    products: ["Mining Operations", "Exploration", "Processing"],
    details: "This office is part of Boliden's mining operations, focusing on exploration, extraction, and processing of base and precious metals. The Boliden area is known for its rich mineral deposits and has been a significant site for mining activities for over a century. Address: Finnforsvägen 4, 936 81 Skellefteå, Phone: 0910-77 40 00, Hours: Monday to Friday, 08:30 - 16:00"
  }
];
