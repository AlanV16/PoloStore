// src/data/mockData.js

// 1. NUEVAS COLECCIONES
export const COLLECTIONS = [
  {
    id: 'invierno-2025',
    title: 'Invierno 2025',
    description: 'Prendas térmicas con estilo urbano para el frío',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', // Foto Fashion Invierno
  },
  {
    id: 'basicos-esenciales',
    title: 'Básicos Esenciales',
    description: 'El minimalismo hecho algodón Pima. Prendas para todos los días.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', // Foto Camiseta Blanca
  },
  {
    id: 'streetwear-edition',
    title: 'Streetwear Edition',
    description: 'Cortes oversize y diseños gráficos para destacar en la calle.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop', // Foto Urbana
  }
];

// 2. PRODUCTOS (Actualizados con collectionId)
export const PRODUCTS = [
  {
    id: 1,
    name: "Polo Oversize Basic Black",
    price: 45.00,
    category: "Oversize",
    collectionId: 'streetwear-edition', // 👈 VINCULADO
    description: "Diseñado para el confort urbano. Fabricado con algodón Pima 100% peruano de alto gramaje.",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
        { name: "Negro", hex: "#000000", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop" },
        { name: "Blanco", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" },
        { name: "Gris", hex: "#333333", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Camiseta Urban White",
    price: 39.90,
    category: "Slim Fit",
    collectionId: 'basicos-esenciales', // 👈 VINCULADO
    description: "La camiseta blanca definitiva.",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    colors: ["#FFFFFF", "#F0F0F0"] 
  },
  {
    id: 3,
    name: "Hoodie Streetwear Grey",
    price: 85.00,
    category: "Hoodies",
    collectionId: 'invierno-2025', // 👈 VINCULADO
    description: "Hoodie de peso pesado con interior perchado para máxima suavidad.",
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#808080", "#000000"]
  },
  {
    id: 4,
    name: "Polo Estampado Vintage",
    price: 55.00,
    category: "Vintage",
    collectionId: 'streetwear-edition', // 👈 VINCULADO
    description: "Gráficos retro con tecnología de impresión digital directa.",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#F5F5DC", "#FFFFFF"]
  }
];