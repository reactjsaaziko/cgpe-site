const bcrypt = require('bcrypt');

// Admin user data with properly hashed passwords
const adminUsers = [
    {
        email: "admin@cgpe.com",
        password: "Admin@123",
        name: "CGPE Admin",
        role: "admin",
        status: "active"
    },
    {
        email: "admin@admin.com", 
        password: "admin",
        name: "Backup Admin",
        role: "admin",
        status: "active"
    }
];

async function setupAdminUsers() {
    console.log('🔧 Setting up admin users...\n');
    
    for (const user of adminUsers) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            
            console.log(`📧 Creating admin user: ${user.email}`);
            console.log(`🔑 Password: ${user.password}`);
            console.log(`🔒 Hashed Password: ${hashedPassword}`);
            console.log('');
            
            // MongoDB insert command
            console.log('📝 MongoDB Insert Command:');
            console.log(`db.admin_users.insertOne({`);
            console.log(`    email: "${user.email}",`);
            console.log(`    password: "${hashedPassword}",`);
            console.log(`    name: "${user.name}",`);
            console.log(`    role: "${user.role}",`);
            console.log(`    status: "${user.status}",`);
            console.log(`    createdAt: new Date(),`);
            console.log(`    updatedAt: new Date()`);
            console.log(`})`);
            console.log('');
            console.log('---');
            console.log('');
        } catch (error) {
            console.error(`Error processing user ${user.email}:`, error);
        }
    }
    
    console.log('✅ Admin user setup complete!');
    console.log('\n📋 Instructions for Backend Administrator:');
    console.log('1. Connect to your MongoDB database');
    console.log('2. Create the admin_users collection if it doesn\'t exist:');
    console.log('   db.createCollection("admin_users")');
    console.log('3. Run the MongoDB insert commands above');
    console.log('4. Test the login with these credentials:');
    console.log('   Email: admin@cgpe.com, Password: Admin@123');
    console.log('   Email: admin@admin.com, Password: admin');
}

// Run the setup
setupAdminUsers().catch(console.error);
