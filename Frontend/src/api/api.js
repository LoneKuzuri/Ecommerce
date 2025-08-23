// api.js - Updated with populate and better debugging
const STRAPI_BASE_URL = 'http://localhost:1337';

export const fetchOil = async () => {
  try {
    // Add populate=* to get all related data including images
    const url = `${STRAPI_BASE_URL}/api/oils?populate=*`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Log the first item to see exact structure
    if (data.data && data.data[0]) {
      console.log('First item structure:', data.data[0]);
      console.log('First item attributes:', data.data[0].attributes);
      
      // Check for image in different locations
      if (data.data[0].image) {
        console.log('Image structure (direct):', data.data[0].image);
      }
      if (data.data[0].attributes?.image) {
        console.log('Image structure (attributes):', data.data[0].attributes.image);
      }
      
      // Log all possible image-related fields
      const item = data.data[0];
      console.log('All item keys:', Object.keys(item));
      Object.keys(item).forEach(key => {
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') || key.toLowerCase().includes('picture')) {
          console.log(`Found image-related field "${key}":`, item[key]);
        }
      });
    }
    
    // Your Strapi structure has data directly on items, not under attributes
    if (data.data && Array.isArray(data.data)) {
      const products = data.data.map(item => {
        console.log('Processing item:', item.id, 'Full item:', item);
        
        // Data is directly on item, not under item.attributes
        // Handle different possible image structures - FIXED VERSION
        let imageUrl = null;
        
        console.log(`Item ${item.id} image field:`, item.image);
        
        // Check various image field possibilities
        const imageField = item.image || item.Image || item.photo || item.picture;
        
        if (imageField) {
          console.log(`Found image field for item ${item.id}:`, imageField);
          
          // Handle array of image objects (your structure)
          if (Array.isArray(imageField) && imageField.length > 0) {
            // Take the first image from the array
            const firstImage = imageField[0];
            imageUrl = firstImage.url || firstImage.attributes?.url;
            console.log(`Array format - extracted URL:`, imageUrl);
          }
          // Handle Strapi media format with data wrapper
          else if (imageField.data) {
            if (Array.isArray(imageField.data)) {
              imageUrl = imageField.data[0]?.attributes?.url || imageField.data[0]?.url;
            } else {
              imageUrl = imageField.data.attributes?.url || imageField.data.url;
            }
            console.log(`Data wrapper format - extracted URL:`, imageUrl);
          } 
          // Handle direct string URL
          else if (typeof imageField === 'string') {
            imageUrl = imageField;
            console.log(`String format - URL:`, imageUrl);
          } 
          // Handle object with url property
          else if (imageField.url) {
            imageUrl = imageField.url;
            console.log(`Direct object format - URL:`, imageUrl);
          }
          
          console.log(`Final processed image URL for item ${item.id}:`, imageUrl);
        } else {
          console.log(`No image field found for item ${item.id}`);
        }
        
        // Add full URL if image exists and is relative
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${STRAPI_BASE_URL}${imageUrl}`;
        }
        
        return {
          id: item.id,
          name: item.name || item.title || 'Unknown Product',
          price: item.Price || item.price || 0, // Note: your field is "Price" with capital P
          description: item.description || '',
          stock: item.stock || item.quantity || 0,
          status: item.status || 'available',
          image: imageUrl,
          // Log what we're returning for each product
          _debug: {
            rawItem: item,
            processedImage: imageUrl
          }
        };
      });
      
      console.log('Mapped products:', products);
      return products;
    }
    
    // Fallback if response format is different
    if (Array.isArray(data)) {
      console.log('Using fallback mapping for direct array response');
      const products = data.map(item => ({
        id: item.id,
        name: item.name || 'Unknown Product',
        price: item.price || 0,
        description: item.description || '',
        stock: item.stock || 0,
        status: item.status || 'available',
        image: item.image?.url ? `${STRAPI_BASE_URL}${item.image.url}` : null,
      }));
      console.log('Mapped products (fallback):', products);
      return products;
    }
    
    console.error('Unexpected API response format:', data);
    throw new Error('Invalid API response format');
    
  } catch (error) {
    console.error('Error fetching oil products:', error);
    throw new Error(`Failed to fetch products from Strapi: ${error.message}`);
  }
};

// Alternative function to fetch with specific populate fields
export const fetchOilWithSpecificFields = async () => {
  try {
    // Only populate specific fields if you know them
    const url = `${STRAPI_BASE_URL}/api/oils?populate[image]=*&fields[0]=name&fields[1]=price&fields[2]=description&fields[3]=stock&fields[4]=status`;
    console.log('Fetching with specific fields from:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Specific fields response:', data);
    return data;
    
  } catch (error) {
    console.error('Error fetching with specific fields:', error);
    throw error;
  }
};