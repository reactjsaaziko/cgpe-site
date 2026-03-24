const bcrypt = require('bcrypt');

async function generateHashedPasswords() {
    console.log('🔐 Generating hashed passwords for admin users...\n');
    
    const passwords = [
        { email: 'admin@cgpe.com', password: 'Admin@123' },
        { email: 'admin@admin.com', password: 'admin' }
    ];
    
    for (const cred of passwords) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(cred.password, saltRounds);
            
            console.log(`📧 Email: ${cred.email}`);
            console.log(`🔑 Password: ${cred.password}`);
            console.log(`🔒 Hashed Password: ${hashedPassword}`);
            console.log('');
            
            // MongoDB insert command
            console.log('📝 MongoDB Insert Command:');
            console.log(`db.admin_users.insertOne({`);
            console.log(`    email: "${cred.email}",`);
            console.log(`    password: "${hashedPassword}",`);
            console.log(`    name: "${cred.email === 'admin@cgpe.com' ? 'CGPE Admin' : 'Backup Admin'}",`);
            console.log(`    role: "admin",`);
            console.log(`    status: "active",`);
            console.log(`    createdAt: new Date(),`);
            console.log(`    updatedAt: new Date()`);
            console.log(`})`);
            console.log('');
            console.log('---');
            console.log('');
        } catch (error) {
            console.error(`Error hashing password for ${cred.email}:`, error);
        }
    }
    
    console.log('✅ Password generation complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Copy the MongoDB insert commands above');
    console.log('2. Connect to your MongoDB database');
    console.log('3. Run the insert commands to create admin users');
    console.log('4. Test the login with the credentials');
}

// Check if bcrypt is available
try {
    generateHashedPasswords();
} catch (error) {
    console.log('❌ bcrypt not found. Installing...');
    console.log('Please run: npm install bcrypt');
    console.log('Then run this script again.');
}
