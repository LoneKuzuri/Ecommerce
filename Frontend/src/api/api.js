const STRAPI_BASE_URL = 'http://localhost:1337';

// Map frontend categories to Strapi collection slugs - match your Strapi collections
const categoryMap = {
  'oil': 'oils',
  'oils': 'oils',
  'daal': 'daals',
  'daals': 'daals',
  'chamal': 'chamal-and-chiuras',
  'chiura': 'chamal-and-chiuras',
  'chamal-chiura': 'chamal-and-chiuras',
  'chamal-and-chiuras': 'chamal-and-chiuras',
  'chamal & chiura': 'chamal-and-chiuras'
};

const fetchFromCollection = async (collectionName) => {
  try {
    const url = `${STRAPI_BASE_URL}/api/${collectionName}?populate=*`;
    console.log(`Fetching from ${collectionName}:`, url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Raw data from ${collectionName}:`, data); // Debug log

    if (data.data && Array.isArray(data.data)) {
      return data.data.map(item => {
        // Debug individual item
        console.log(`Processing item from ${collectionName}:`, item);

        let imageUrl = null;
        const imageField = item.image || item.Image || item.photo || item.picture;

        if (imageField) {
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

        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${STRAPI_BASE_URL}${imageUrl}`;
        }

        // Fixed stock logic - check multiple possible field names and handle different data types
        const stockValue = item.stock || item.Stock || item.quantity || item.Quantity || item.inStock;
        let isInStock = false;
        let stockDisplay = 'Out of Stock';

        if (stockValue !== undefined && stockValue !== null) {
          if (typeof stockValue === 'boolean') {
            isInStock = stockValue;
            stockDisplay = stockValue ? 'Available' : 'Out of Stock';
          } else if (typeof stockValue === 'number') {
            isInStock = stockValue > 0;
            stockDisplay = stockValue > 0 ? `${stockValue} left` : 'Out of Stock';
          } else if (typeof stockValue === 'string') {
            const lowerStock = stockValue.toLowerCase();
            isInStock = lowerStock === 'available' || lowerStock === 'in stock' || lowerStock === 'true';
            stockDisplay = isInStock ? 'Available' : 'Out of Stock';
          }
        }

        // Get name - check multiple possible field names
        const productName = item.name || item.Name || item.title || item.Title || item.productName || 'Unknown Product';

        // Get price - check multiple possible field names
        const productPrice = item.price || item.Price || item.cost || item.Cost || 0;

        const result = {
          id: item.id, // Keep original id for category-specific fetches
          name: productName,
          price: productPrice,
          description: item.description || item.Description || '',
          stock: stockValue,
          inStock: isInStock,
          status: item.status || 'available',
          image: imageUrl,
          category: collectionName,
          stockDisplay: stockDisplay
        };

        console.log(`Processed product:`, result); // Debug processed result
        return result;
      });
    }

    return [];
  } catch (error) {
    console.error(`Error fetching ${collectionName} products:`, error);
    throw new Error(`Failed to fetch ${collectionName} from Strapi: ${error.message}`);
  }
};

export const fetchOil = async () => fetchFromCollection('oils');
export const fetchChamalChiura = async () => fetchFromCollection('chamal-and-chiuras');
export const fetchDaal = async () => fetchFromCollection('daals');

export const fetchAllProducts = async () => {
  try {
    const [oils, chamalChiura, daals] = await Promise.all([
      fetchOil().catch((error) => {
        console.error('Error fetching oils:', error);
        return [];
      }),
      fetchChamalChiura().catch((error) => {
        console.error('Error fetching chamal-chiura:', error);
        return [];
      }),
      fetchDaal().catch((error) => {
        console.error('Error fetching daals:', error);
        return [];
      }),
    ]);
    
    console.log('All products fetched:', { oils: oils.length, chamalChiura: chamalChiura.length, daals: daals.length });
    
    // Combine arrays and ensure unique IDs by prefixing with category
    const allProducts = [
      ...oils.map(product => ({ ...product, uniqueId: `${product.category}-${product.id}` })),
      ...chamalChiura.map(product => ({ ...product, uniqueId: `${product.category}-${product.id}` })),
      ...daals.map(product => ({ ...product, uniqueId: `${product.category}-${product.id}` })),
    ];
    
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (category) => {
  const key = categoryMap[category.toLowerCase()];
  if (!key) throw new Error(`Unknown category: ${category}`);
  return fetchFromCollection(key);
};

export const getAvailableCategories = async () => {
  try {
    const allProducts = await fetchAllProducts();
    const categories = [...new Set(allProducts.map(product => product.category))];
    return categories.map(category => ({
      name: category,
      displayName: getCategoryDisplayName(category),
      count: allProducts.filter(product => product.category === category).length,
    }));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

const getCategoryDisplayName = (category) => {
  const displayNames = {
    'oils': 'Oils (तेल)',
    'chamal-and-chiuras': 'Rice & Chiura (चामल र चिउरा)',
    'daals': 'Lentils (दाल)'
  };
  return displayNames[category] || category;
};