const mongoose = require('mongoose');
const Categories = require('./src/models/Categories.model');

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lck-viet';

async function setupCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Check existing categories
    const existingCategories = await Categories.find({});
    console.log('Existing categories:', existingCategories.length);
    
    existingCategories.forEach(cat => {
      console.log(`ID: ${cat._id}, Name: ${cat.name}, Slug: ${cat.slug}`);
    });

    // Create default categories if they don't exist
    if (existingCategories.length === 0) {
      console.log('Creating default categories...');
      
      const interior = new Categories({
        name: 'Thiết kế nội thất',
        slug: 'thiet-ke-noi-that',
        isActive: true
      });
      
      const exterior = new Categories({
        name: 'Thiết kế ngoại thất',
        slug: 'thiet-ke-ngoai-that', 
        isActive: true
      });
      
      await interior.save();
      await exterior.save();
      
      console.log('Created categories:');
      console.log('Interior ID:', interior._id.toString());
      console.log('Exterior ID:', exterior._id.toString());
      
      // Update the frontend files with real IDs
      console.log('\nPlease update your frontend files with these real category IDs:');
      console.log('Interior ID:', interior._id.toString());
      console.log('Exterior ID:', exterior._id.toString());
    } else {
      console.log('Categories already exist');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

setupCategories();
