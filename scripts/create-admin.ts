import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bellarya:Hwvm7BKdg1SRo2oJ@bellarya.dkbscnk.mongodb.net/?appName=bellarya';

async function createAdminUser() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: 'bellarya' });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@bellarya.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Name:', existingAdmin.name);
      console.log('Role:', existingAdmin.role);

      // Update password if needed
      const newPassword = 'admin123';
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne(
        { email: 'admin@bellarya.com' },
        { password: hashedPassword, active: true }
      );

      console.log('✅ Admin password reset to: admin123');
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminUser = await User.create({
        name: 'Administrator',
        email: 'admin@bellarya.com',
        password: hashedPassword,
        role: 'admin',
        active: true,
      });

      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Password: admin123');
      console.log('👤 Role:', adminUser.role);
    }

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdminUser();
