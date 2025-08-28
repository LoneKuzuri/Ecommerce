// api.js - Fixed version with proper boolean stock handling
const STRAPI_BASE_URL = 'http://localhost:1337';

const fetchFromCollection = async (collectionName) => {
  try {
    const url = `${STRAPI_BASE_URL}/api/${collectionName}?populate=*`;
    console.log(`Fetching from ${collectionName}:`, url);
    
    const response = await fetch(url);
    console.log(`Response status for ${collectionName}:`, response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Raw API response for ${collectionName}:`, data);
    
    if (data.data && Array.isArray(data.data)) {
      const products = data.data.map(item => {
        console.log(`Processing ${collectionName} item:`, item.id, 'Full item:', item);
        
        // Handle different possible image structures
        let imageUrl = null;
        const imageField = item.image || item.Image || item.photo || item.picture;
        
        if (imageField) {
          console.log(`Found image field for ${collectionName} item ${item.id}:`, imageField);
          
          if (Array.isArray(imageField) && imageField.length > 0) {
            const firstImage = imageField[0];
            imageUrl = firstImage.url || firstImage.attributes?.url;
          } else if (imageField.data) {
            if (Array.isArray(imageField.data)) {
              imageUrl = imageField.data[0]?.attributes?.url || imageField.data[0]?.url;
            } else {
              imageUrl = imageField.data.attributes?.url || imageField.data.url;
            }
          } else if (typeof imageField === 'string') {
            imageUrl = imageField;
          } else if (imageField.url) {
            imageUrl = imageField.url;
          }
        }
        
        // Add full URL if image exists and is relative
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${STRAPI_BASE_URL}${imageUrl}`;
        }
        
        // FIXED: Proper stock handling for both boolean and number
        const stockValue = item.stock;
        const isInStock = typeof stockValue === 'boolean' ? stockValue : (stockValue > 0);
        
        console.log(`Item ${item.id} stock:`, stockValue, 'Type:', typeof stockValue, 'Is in stock:', isInStock);
        
        return {
          id: item.id,
          name: item.name || item.title || 'Unknown Product',
          price: item.Price || item.price || 0,
          description: item.description || '',
          stock: stockValue, // Keep original stock value
          status: item.status || 'available',
          image: imageUrl,
          category: collectionName,
          // FIXED: Add explicit inStock boolean
          inStock: isInStock,
          // Add stock display for UI
          stockDisplay: typeof stockValue === 'boolean' 
            ? (stockValue ? 'Available' : 'Out of Stock')
            : stockValue > 0 
            ? `${stockValue} available`
            : 'Out of Stock'
        };
      });
      
      console.log(`Mapped ${collectionName} products:`, products);
      return products;
    }
    
    return [];
    
  } catch (error) {
    console.error(`Error fetching ${collectionName} products:`, error);
    throw new Error(`Failed to fetch ${collectionName} from Strapi: ${error.message}`);
  }
};

// Specific fetch functions for each category
export const fetchOil = async () => {
  return await fetchFromCollection('oils');
};

export const fetchChamalChiura = async () => {
  return await fetchFromCollection('chamal-and-chiuras');
};

export const fetchDaal = async () => {
  return await fetchFromCollection('daals');
};

// Fetch all products from all categories
export const fetchAllProducts = async () => {
  try {
    console.log('Fetching all products from all categories...');
    
    const [oils, chamalChiura, daals] = await Promise.all([
      fetchOil().catch(err => {
        console.warn('Could not fetch oils:', err.message);
        return [];
      }),
      fetchChamalChiura().catch(err => {
        console.warn('Could not fetch chamal & chiura:', err.message);
        return [];
      }),
      fetchDaal().catch(err => {
        console.warn('Could not fetch daals:', err.message);
        return [];
      })
    ]);
    
    const allProducts = [...oils, ...chamalChiura, ...daals];
    console.log('All products combined:', allProducts);
    return allProducts;
    
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

// Get products by category
export const fetchProductsByCategory = async (category) => {
  const categoryMap = {
    'oil': 'oils',
    'oils': 'oils',
    'chamal': 'chamal-and-chiuras',
    'chiura': 'chamal-and-chiuras',
    'chamal-chiura': 'chamal-and-chiuras',
    'chamal-and-chiuras': 'chamal-and-chiuras',
    'daal': 'daals',
    'daals': 'daals'
  };
  
  const collectionName = categoryMap[category.toLowerCase()];
  
  if (!collectionName) {
    throw new Error(`Unknown category: ${category}`);
  }
  
  return await fetchFromCollection(collectionName);
};

// Search products across all categories
export const searchProducts = async (searchTerm) => {
  try {
    const allProducts = await fetchAllProducts();
    
    if (!searchTerm || searchTerm.trim() === '') {
      return allProducts;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
    
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error(`Search failed: ${error.message}`);
  }
};

// Get available categories
export const getAvailableCategories = async () => {
  try {
    const allProducts = await fetchAllProducts();
    const categories = [...new Set(allProducts.map(product => product.category))];
    
    return categories.map(category => ({
      name: category,
      displayName: getCategoryDisplayName(category),
      count: allProducts.filter(product => product.category === category).length
    }));
    
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Helper function to get display names for categories
const getCategoryDisplayName = (category) => {
  const displayNames = {
    'oils': 'Oils (तेल)',
    'chamal-and-chiuras': 'Rice & Chiura (चामल र चिउरा)',
    'daal': 'Lentils (दाल)'
  };
  
  return displayNames[category] || category;
};

// Debug function to check stock handling
export const debugStockHandling = async () => {
  console.log('=== DEBUGGING STOCK HANDLING ===');
  
  try {
    const oils = await fetchOil();
    console.log('Oils with stock info:');
    oils.forEach(product => {
      console.log(`- ${product.name}:`, {
        originalStock: product.stock,
        stockType: typeof product.stock,
        inStock: product.inStock,
        stockDisplay: product.stockDisplay
      });
    });
    
    const chamalChiura = await fetchChamalChiura();
    console.log('Chamal & Chiura with stock info:');
    chamalChiura.forEach(product => {
      console.log(`- ${product.name}:`, {
        originalStock: product.stock,
        stockType: typeof product.stock,
        inStock: product.inStock,
        stockDisplay: product.stockDisplay
      });
    });
    
  } catch (error) {
    console.error('Debug failed:', error);
  }
};