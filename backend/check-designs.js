const mongoose = require('mongoose');
const Design = require('./src/models/Design.model');
const Categories = require('./src/models/Categories.model');

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lck-viet';

async function checkDesigns() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Check all designs
    const designs = await Design.find({});
    console.log(`\nFound ${designs.length} designs:`);
    
    for (const design of designs) {
      console.log(`\nDesign: ${design.projectName}`);
      console.log(`ID: ${design._id}`);
      console.log(`Categories field:`, design.categories);
      console.log(`Categories type:`, typeof design.categories);
    }

    // Check categories
    const categories = await Categories.find({});
    console.log(`\n\nFound ${categories.length} categories:`);
    
    for (const category of categories) {
      console.log(`Category: ${category.name} (ID: ${category._id})`);
    }

    // Test populate
    console.log('\n\nTesting populate...');
    const populatedDesigns = await Design.find({}).populate('categories', 'name slug');
    console.log(`Populated designs: ${populatedDesigns.length}`);
    
    for (const design of populatedDesigns) {
      console.log(`Design: ${design.projectName} -> Category: ${design.categories}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkDesigns();
