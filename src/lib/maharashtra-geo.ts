// Maharashtra district centroids and approximate boundary polygons for GIS
// Using simplified boundary coordinates for all 36 districts

export interface DistrictGeo {
  name: string;
  center: [number, number]; // [lat, lng]
  boundary: [number, number][]; // Simplified polygon
  color?: string;
}

// District centroids with approximate boundary polygons
export const MAHARASHTRA_DISTRICTS_GEO: DistrictGeo[] = [
  {
    name: "Mumbai City",
    center: [18.975, 72.825],
    boundary: [[19.08, 72.78], [19.11, 72.84], [19.08, 72.92], [18.89, 72.93], [18.89, 72.82], [18.93, 72.78]]
  },
  {
    name: "Mumbai Suburban",
    center: [19.20, 72.85],
    boundary: [[19.28, 72.76], [19.30, 72.88], [19.25, 72.96], [19.08, 72.92], [19.11, 72.84], [19.08, 72.78], [19.14, 72.76]]
  },
  {
    name: "Thane",
    center: [19.45, 73.15],
    boundary: [[19.65, 72.95], [19.72, 73.12], [19.70, 73.38], [19.40, 73.48], [19.15, 73.30], [19.14, 73.05], [19.28, 72.88], [19.50, 72.85]]
  },
  {
    name: "Palghar",
    center: [19.75, 72.80],
    boundary: [[20.05, 72.65], [20.12, 72.82], [20.05, 73.10], [19.72, 73.12], [19.65, 72.95], [19.50, 72.85], [19.55, 72.68], [19.80, 72.55]]
  },
  {
    name: "Raigad",
    center: [18.52, 73.12],
    boundary: [[18.85, 72.95], [18.90, 73.22], [18.72, 73.48], [18.35, 73.50], [18.12, 73.30], [18.15, 73.05], [18.40, 72.90], [18.65, 72.82]]
  },
  {
    name: "Ratnagiri",
    center: [17.00, 73.30],
    boundary: [[17.55, 73.10], [17.58, 73.45], [17.25, 73.68], [16.72, 73.52], [16.55, 73.30], [16.62, 73.08], [17.05, 72.95], [17.38, 73.00]]
  },
  {
    name: "Sindhudurg",
    center: [16.35, 73.55],
    boundary: [[16.72, 73.52], [16.68, 73.72], [16.38, 73.92], [15.92, 73.85], [15.85, 73.60], [16.02, 73.38], [16.35, 73.30], [16.55, 73.30]]
  },
  {
    name: "Pune",
    center: [18.52, 73.85],
    boundary: [[18.95, 73.55], [18.98, 74.05], [18.80, 74.42], [18.35, 74.55], [18.08, 74.30], [18.05, 73.80], [18.20, 73.50], [18.60, 73.35]]
  },
  {
    name: "Satara",
    center: [17.68, 74.00],
    boundary: [[17.98, 73.65], [18.05, 74.10], [17.92, 74.42], [17.52, 74.50], [17.28, 74.25], [17.25, 73.82], [17.50, 73.55], [17.80, 73.50]]
  },
  {
    name: "Sangli",
    center: [16.85, 74.56],
    boundary: [[17.15, 74.18], [17.22, 74.65], [17.05, 74.95], [16.65, 74.98], [16.42, 74.72], [16.48, 74.28], [16.72, 74.08], [17.00, 74.05]]
  },
  {
    name: "Kolhapur",
    center: [16.69, 74.23],
    boundary: [[17.00, 73.90], [17.08, 74.35], [16.92, 74.62], [16.48, 74.65], [16.22, 74.35], [16.25, 73.95], [16.50, 73.72], [16.82, 73.70]]
  },
  {
    name: "Solapur",
    center: [17.67, 75.92],
    boundary: [[18.05, 75.42], [18.12, 75.92], [18.00, 76.40], [17.52, 76.48], [17.18, 76.22], [17.15, 75.62], [17.40, 75.28], [17.80, 75.22]]
  },
  {
    name: "Nashik",
    center: [20.00, 73.78],
    boundary: [[20.50, 73.38], [20.55, 73.82], [20.40, 74.25], [19.85, 74.35], [19.52, 74.05], [19.50, 73.55], [19.72, 73.20], [20.15, 73.15]]
  },
  {
    name: "Ahmednagar",
    center: [19.09, 74.75],
    boundary: [[19.65, 74.25], [19.70, 74.82], [19.52, 75.30], [19.00, 75.42], [18.62, 75.12], [18.58, 74.52], [18.82, 74.10], [19.30, 73.98]]
  },
  {
    name: "Dhule",
    center: [20.90, 74.77],
    boundary: [[21.25, 74.38], [21.30, 74.82], [21.15, 75.15], [20.72, 75.22], [20.50, 74.95], [20.52, 74.48], [20.75, 74.22], [21.05, 74.18]]
  },
  {
    name: "Nandurbar",
    center: [21.40, 74.25],
    boundary: [[21.75, 73.85], [21.80, 74.28], [21.68, 74.62], [21.25, 74.68], [21.05, 74.42], [21.02, 73.98], [21.22, 73.68], [21.55, 73.62]]
  },
  {
    name: "Jalgaon",
    center: [21.00, 75.56],
    boundary: [[21.38, 75.10], [21.42, 75.60], [21.25, 76.02], [20.78, 76.08], [20.55, 75.78], [20.58, 75.25], [20.80, 74.95], [21.15, 74.88]]
  },
  {
    name: "Aurangabad",
    center: [19.87, 75.34],
    boundary: [[20.28, 74.92], [20.32, 75.42], [20.15, 75.82], [19.68, 75.88], [19.42, 75.58], [19.45, 75.05], [19.68, 74.72], [20.02, 74.68]]
  },
  {
    name: "Jalna",
    center: [19.84, 75.88],
    boundary: [[20.15, 75.52], [20.18, 75.95], [20.02, 76.32], [19.62, 76.35], [19.42, 76.08], [19.45, 75.58], [19.65, 75.32], [19.95, 75.28]]
  },
  {
    name: "Beed",
    center: [18.99, 75.76],
    boundary: [[19.38, 75.35], [19.42, 75.82], [19.25, 76.22], [18.78, 76.28], [18.52, 75.98], [18.55, 75.45], [18.78, 75.15], [19.12, 75.08]]
  },
  {
    name: "Latur",
    center: [18.40, 76.56],
    boundary: [[18.75, 76.15], [18.78, 76.58], [18.62, 76.95], [18.22, 76.98], [17.98, 76.72], [18.02, 76.25], [18.25, 75.95], [18.55, 75.88]]
  },
  {
    name: "Osmanabad",
    center: [18.18, 76.05],
    boundary: [[18.52, 75.65], [18.55, 76.08], [18.38, 76.45], [17.98, 76.48], [17.78, 76.22], [17.82, 75.75], [18.05, 75.48], [18.35, 75.42]]
  },
  {
    name: "Parbhani",
    center: [19.27, 76.78],
    boundary: [[19.62, 76.38], [19.65, 76.82], [19.48, 77.18], [19.05, 77.22], [18.82, 76.95], [18.85, 76.48], [19.08, 76.22], [19.42, 76.15]]
  },
  {
    name: "Hingoli",
    center: [19.72, 77.15],
    boundary: [[20.02, 76.80], [20.05, 77.18], [19.88, 77.52], [19.52, 77.55], [19.35, 77.30], [19.38, 76.90], [19.58, 76.62], [19.85, 76.58]]
  },
  {
    name: "Nanded",
    center: [19.15, 77.30],
    boundary: [[19.55, 76.88], [19.58, 77.38], [19.42, 77.82], [18.92, 77.88], [18.68, 77.55], [18.72, 77.02], [18.95, 76.72], [19.30, 76.65]]
  },
  {
    name: "Buldhana",
    center: [20.53, 76.18],
    boundary: [[20.88, 75.78], [20.92, 76.22], [20.75, 76.58], [20.35, 76.62], [20.12, 76.35], [20.15, 75.88], [20.38, 75.58], [20.68, 75.52]]
  },
  {
    name: "Akola",
    center: [20.70, 77.00],
    boundary: [[21.02, 76.62], [21.05, 77.05], [20.88, 77.38], [20.48, 77.42], [20.28, 77.15], [20.32, 76.72], [20.52, 76.42], [20.82, 76.38]]
  },
  {
    name: "Washim",
    center: [20.10, 77.15],
    boundary: [[20.40, 76.82], [20.42, 77.18], [20.28, 77.50], [19.92, 77.52], [19.75, 77.28], [19.78, 76.92], [19.95, 76.65], [20.22, 76.62]]
  },
  {
    name: "Amravati",
    center: [20.93, 77.77],
    boundary: [[21.32, 77.32], [21.35, 77.82], [21.18, 78.22], [20.72, 78.28], [20.48, 77.98], [20.52, 77.45], [20.75, 77.15], [21.08, 77.08]]
  },
  {
    name: "Yavatmal",
    center: [20.40, 78.12],
    boundary: [[20.78, 77.68], [20.82, 78.18], [20.65, 78.58], [20.22, 78.62], [19.98, 78.32], [20.02, 77.82], [20.25, 77.52], [20.58, 77.48]]
  },
  {
    name: "Nagpur",
    center: [21.14, 79.08],
    boundary: [[21.55, 78.62], [21.58, 79.15], [21.42, 79.58], [20.95, 79.62], [20.72, 79.32], [20.75, 78.78], [20.98, 78.45], [21.32, 78.38]]
  },
  {
    name: "Wardha",
    center: [20.74, 78.60],
    boundary: [[21.05, 78.22], [21.08, 78.65], [20.92, 79.00], [20.55, 79.02], [20.35, 78.78], [20.38, 78.32], [20.58, 78.05], [20.85, 78.00]]
  },
  {
    name: "Chandrapur",
    center: [19.95, 79.30],
    boundary: [[20.38, 78.85], [20.42, 79.38], [20.25, 79.82], [19.75, 79.88], [19.48, 79.55], [19.52, 79.02], [19.75, 78.68], [20.12, 78.62]]
  },
  {
    name: "Bhandara",
    center: [21.17, 79.65],
    boundary: [[21.45, 79.30], [21.48, 79.68], [21.32, 80.00], [20.98, 80.02], [20.82, 79.78], [20.85, 79.38], [21.02, 79.12], [21.28, 79.08]]
  },
  {
    name: "Gondia",
    center: [21.45, 80.20],
    boundary: [[21.75, 79.85], [21.78, 80.22], [21.62, 80.55], [21.28, 80.58], [21.08, 80.32], [21.12, 79.95], [21.30, 79.68], [21.55, 79.62]]
  },
  {
    name: "Gadchiroli",
    center: [20.18, 80.00],
    boundary: [[20.62, 79.52], [20.68, 80.08], [20.48, 80.58], [19.92, 80.65], [19.62, 80.28], [19.65, 79.72], [19.90, 79.35], [20.35, 79.28]]
  },
];

// Maharashtra state boundary (simplified)
export const MAHARASHTRA_STATE_BOUNDARY: [number, number][] = [
  [20.12, 72.65], [20.55, 72.68], [21.48, 73.62], [21.80, 74.28], [21.75, 75.10],
  [21.42, 75.60], [21.35, 76.22], [21.58, 77.38], [21.62, 78.22], [21.78, 79.15],
  [21.78, 80.22], [21.62, 80.55], [20.68, 80.58], [20.48, 80.08], [19.58, 79.72],
  [19.52, 79.02], [18.92, 77.88], [18.22, 76.98], [17.98, 76.48], [17.52, 76.48],
  [17.18, 75.62], [16.65, 74.98], [16.22, 74.35], [15.85, 73.60], [16.02, 73.08],
  [16.62, 72.90], [17.05, 72.95], [17.55, 73.10], [18.15, 73.05], [18.40, 72.82],
  [18.89, 72.78], [19.14, 72.76], [19.50, 72.68],
];

// Crop suitability data by region type
export const CROP_SUITABILITY_ZONES: Record<string, {
  zone: string;
  color: string;
  crops: string[];
  rainfall: string;
  soilType: string;
}> = {
  "Mumbai City": { zone: "Konkan Coast", color: "#2563eb", crops: ["Rice", "Coconut", "Mango"], rainfall: "2500-3500mm", soilType: "Laterite" },
  "Mumbai Suburban": { zone: "Konkan Coast", color: "#2563eb", crops: ["Rice", "Coconut", "Mango"], rainfall: "2500-3500mm", soilType: "Laterite" },
  "Thane": { zone: "Konkan Coast", color: "#2563eb", crops: ["Rice", "Coconut", "Mango"], rainfall: "2500-3500mm", soilType: "Laterite" },
  "Palghar": { zone: "Konkan Coast", color: "#2563eb", crops: ["Rice", "Coconut", "Mango"], rainfall: "2500-3500mm", soilType: "Laterite" },
  "Raigad": { zone: "Konkan Coast", color: "#2563eb", crops: ["Rice", "Coconut", "Mango"], rainfall: "2500-3500mm", soilType: "Laterite" },
  "Ratnagiri": { zone: "Konkan Coast", color: "#1d4ed8", crops: ["Rice", "Mango", "Cashew"], rainfall: "3000-4000mm", soilType: "Laterite" },
  "Sindhudurg": { zone: "Konkan Coast", color: "#1d4ed8", crops: ["Rice", "Cashew", "Coconut"], rainfall: "3000-4000mm", soilType: "Laterite" },
  "Pune": { zone: "Western Ghat Transition", color: "#16a34a", crops: ["Sugarcane", "Onion", "Wheat", "Tomato"], rainfall: "700-1200mm", soilType: "Black + Red" },
  "Satara": { zone: "Western Ghat Transition", color: "#16a34a", crops: ["Sugarcane", "Wheat", "Rice"], rainfall: "800-1500mm", soilType: "Laterite + Black" },
  "Sangli": { zone: "Deccan Plateau", color: "#ca8a04", crops: ["Sugarcane", "Tur", "Soybean"], rainfall: "500-700mm", soilType: "Black" },
  "Kolhapur": { zone: "Western Ghat Transition", color: "#16a34a", crops: ["Sugarcane", "Rice", "Soybean"], rainfall: "1000-2000mm", soilType: "Laterite" },
  "Solapur": { zone: "Drought Prone", color: "#dc2626", crops: ["Bajra", "Wheat", "Sugarcane"], rainfall: "400-600mm", soilType: "Black" },
  "Nashik": { zone: "Western Ghat Transition", color: "#16a34a", crops: ["Onion", "Tomato", "Wheat", "Grape"], rainfall: "600-1000mm", soilType: "Red + Black" },
  "Ahmednagar": { zone: "Deccan Plateau", color: "#ca8a04", crops: ["Sugarcane", "Onion", "Wheat"], rainfall: "500-700mm", soilType: "Black" },
  "Dhule": { zone: "Khandesh", color: "#ea580c", crops: ["Cotton", "Bajra", "Banana"], rainfall: "500-700mm", soilType: "Black" },
  "Nandurbar": { zone: "Tribal Belt", color: "#7c3aed", crops: ["Rice", "Maize", "Cotton"], rainfall: "600-900mm", soilType: "Red + Black" },
  "Jalgaon": { zone: "Khandesh", color: "#ea580c", crops: ["Banana", "Cotton", "Bajra"], rainfall: "500-700mm", soilType: "Black" },
  "Aurangabad": { zone: "Marathwada", color: "#b91c1c", crops: ["Cotton", "Bajra", "Maize"], rainfall: "500-700mm", soilType: "Black" },
  "Jalna": { zone: "Marathwada", color: "#b91c1c", crops: ["Cotton", "Soybean", "Bajra"], rainfall: "500-700mm", soilType: "Black" },
  "Beed": { zone: "Drought Prone", color: "#dc2626", crops: ["Cotton", "Bajra", "Soybean"], rainfall: "400-600mm", soilType: "Black" },
  "Latur": { zone: "Marathwada", color: "#b91c1c", crops: ["Soybean", "Tur", "Cotton"], rainfall: "600-800mm", soilType: "Black" },
  "Osmanabad": { zone: "Drought Prone", color: "#dc2626", crops: ["Soybean", "Sugarcane", "Bajra"], rainfall: "400-600mm", soilType: "Black" },
  "Parbhani": { zone: "Marathwada", color: "#b91c1c", crops: ["Cotton", "Soybean", "Tur"], rainfall: "600-800mm", soilType: "Black" },
  "Hingoli": { zone: "Marathwada", color: "#b91c1c", crops: ["Soybean", "Tur", "Cotton"], rainfall: "700-900mm", soilType: "Black" },
  "Nanded": { zone: "Marathwada", color: "#b91c1c", crops: ["Soybean", "Tur", "Cotton"], rainfall: "700-900mm", soilType: "Black" },
  "Buldhana": { zone: "Vidarbha West", color: "#d97706", crops: ["Cotton", "Soybean", "Tur"], rainfall: "700-900mm", soilType: "Black" },
  "Akola": { zone: "Vidarbha West", color: "#d97706", crops: ["Cotton", "Soybean", "Tur"], rainfall: "700-900mm", soilType: "Black" },
  "Washim": { zone: "Vidarbha West", color: "#d97706", crops: ["Cotton", "Soybean", "Tur"], rainfall: "700-900mm", soilType: "Black" },
  "Amravati": { zone: "Vidarbha West", color: "#d97706", crops: ["Cotton", "Soybean", "Tur"], rainfall: "800-1000mm", soilType: "Black" },
  "Yavatmal": { zone: "Vidarbha East", color: "#92400e", crops: ["Cotton", "Soybean", "Tur"], rainfall: "800-1000mm", soilType: "Black" },
  "Nagpur": { zone: "Vidarbha East", color: "#92400e", crops: ["Cotton", "Soybean", "Wheat"], rainfall: "900-1200mm", soilType: "Black + Red" },
  "Wardha": { zone: "Vidarbha East", color: "#92400e", crops: ["Cotton", "Soybean", "Wheat"], rainfall: "800-1000mm", soilType: "Black" },
  "Chandrapur": { zone: "Vidarbha East", color: "#92400e", crops: ["Cotton", "Rice", "Soybean"], rainfall: "1000-1400mm", soilType: "Red + Black" },
  "Bhandara": { zone: "Vidarbha East", color: "#92400e", crops: ["Rice", "Wheat", "Cotton"], rainfall: "1000-1400mm", soilType: "Red" },
  "Gondia": { zone: "Vidarbha East", color: "#92400e", crops: ["Rice", "Wheat", "Cotton"], rainfall: "1200-1600mm", soilType: "Red" },
  "Gadchiroli": { zone: "Tribal Forest Belt", color: "#15803d", crops: ["Rice", "Maize", "Minor Millets"], rainfall: "1200-1600mm", soilType: "Red + Laterite" },
};
