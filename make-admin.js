// make-admin.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // CAMBIA CON LA TUA EMAIL
    const email = 'test@example.com';
    
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );
    
    if (user) {
      console.log(`✅ Utente ${user.email} aggiornato a ADMIN`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Ruolo: ${user.role}`);
    } else {
      console.log(`❌ Utente con email ${email} non trovato.`);
      console.log('   Registrati prima dal sito.');
    }
  } catch (error) {
    console.error('❌ Errore:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

makeAdmin();