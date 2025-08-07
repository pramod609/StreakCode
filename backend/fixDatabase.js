const mongoose = require('mongoose');
require('dotenv').config();

const fixDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        
        // Drop the problematic index on problemSolved field
        try {
            await db.collection('users').dropIndex('problemSolved_1');
            console.log('Successfully dropped problemSolved_1 index');
        } catch (error) {
            console.log('Index might not exist or already dropped:', error.message);
        }

        // Ensure all users have problemSolved as an empty array if undefined
        const updateResult = await db.collection('users').updateMany(
            { problemSolved: { $exists: false } },
            { $set: { problemSolved: [] } }
        );
        console.log(`Updated ${updateResult.modifiedCount} users to have empty problemSolved array`);

        // Also fix any users with null problemSolved
        const updateNullResult = await db.collection('users').updateMany(
            { problemSolved: null },
            { $set: { problemSolved: [] } }
        );
        console.log(`Updated ${updateNullResult.modifiedCount} users with null problemSolved`);

        console.log('Database fix completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing database:', error);
        process.exit(1);
    }
};

fixDatabase();
