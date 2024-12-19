const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt helyett bcryptjs

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    games: { type: Array, default: [] }
});

// Jelszó titkosítása mentés előtt
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // bcrypt helyett bcryptjs
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
