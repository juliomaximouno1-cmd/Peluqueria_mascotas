import app from './app.js'
import { connectDB } from './db.js'

connectDB();
app.listen(3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server on port', PORT)
});