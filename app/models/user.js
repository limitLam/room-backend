import mongoose from 'mongoose';
import User from '../schemas/user';
export default mongoose.model('User', User);