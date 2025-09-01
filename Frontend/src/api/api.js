const API_URL = "http://localhost:1337/api"; 


const mapProduct = (item) => {
  
  console.log("Processing product item:", item);

  // Validate item
  if (!item || !item.id) {
    console.warn("Invalid product item (missing id):", item);
    return null;
  }

  return {
    id: item.id,
    name: item.name || "Unnamed Product", // Direct access to root-level name
    price: item.Price ?? 0, // Direct access to root-level Price
    stock: item.stock ?? 0, // Direct access to root-level stock
    status: item.stat || "available",
    image: item.Image?.[0]?.url
      ? `http://localhost:1337${item.Image[0].url}` // Handle Image as array
      : null,
    category: item.category || "Uncategorized", // Direct access to root-level category
    inStock: (item.stock ?? 0) > 0,
    stockDisplay: (item.stock ?? 0) > 0 ? `${item.stock} left` : "Out of Stock",
  };
};

//Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products?populate=*`);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const data = await res.json();
    console.log("Products API response:", JSON.stringify(data, null, 2)); // Detailed debug
    return (data.data || [])
      .map((item, index) => {
        console.log(`Mapping product at index ${index}:`, item);
        return mapProduct(item);
      })
      .filter((item) => item !== null);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const res = await fetch(
      `${API_URL}/products?filters[category][$eq]=${encodeURIComponent(category)}&populate=*`
    );
    if (!res.ok) throw new Error(`Failed to fetch products by category: ${res.status}`);
    const data = await res.json();
    console.log(`Products by category (${category}) API response:`, JSON.stringify(data, null, 2)); // Detailed debug
    return (data.data || [])
      .map((item, index) => {
        console.log(`Mapping product at index ${index} for category ${category}:`, item);
        return mapProduct(item);
      })
      .filter((item) => item !== null);
  } catch (error) {
    console.error(`Error fetching products by category (${category}):`, error);
    return [];
  }
};

// Fetch all categories 
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/products?fields=category`);
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    const data = await res.json();
    console.log("Categories API response:", JSON.stringify(data, null, 2)); // Detailed debug

    // Extract unique categories and count occurrences
    const categoryCounts = {};
    (data.data || []).forEach((item, index) => {
      console.log(`Processing category item at index ${index}:`, item);
      if (item?.category) {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      } else {
        console.warn(`Invalid category item at index ${index} (missing category):`, item);
      }
    });

    // Transform into array of objects
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      displayName: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize for display
      count,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};