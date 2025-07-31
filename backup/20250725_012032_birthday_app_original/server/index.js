import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import cron from 'node-cron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Database setup
const db = new sqlite3.Database(join(__dirname, 'birthdays.db'))

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS birthdays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      birthDate TEXT NOT NULL,
      phone TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

// Routes
app.get('/api/birthdays', (req, res) => {
  db.all('SELECT * FROM birthdays ORDER BY birthDate', (err, rows) => {
    if (err) {
      console.error('Error fetching birthdays:', err)
      res.status(500).json({ error: 'Failed to fetch birthdays' })
      return
    }
    res.json(rows)
  })
})

app.post('/api/birthdays', (req, res) => {
  const { name, email, birthDate, phone } = req.body
  
  if (!name || !email || !birthDate) {
    res.status(400).json({ error: 'Name, email, and birthDate are required' })
    return
  }
  
  db.run(
    'INSERT INTO birthdays (name, email, birthDate, phone) VALUES (?, ?, ?, ?)',
    [name, email, birthDate, phone || null],
    function(err) {
      if (err) {
        console.error('Error adding birthday:', err)
        res.status(500).json({ error: 'Failed to add birthday' })
        return
      }
      
      res.json({
        id: this.lastID,
        name,
        email,
        birthDate,
        phone,
        message: 'Birthday added successfully'
      })
    }
  )
})

app.put('/api/birthdays/:id', (req, res) => {
  const { id } = req.params
  const { name, email, birthDate, phone } = req.body
  
  if (!name || !email || !birthDate) {
    res.status(400).json({ error: 'Name, email, and birthDate are required' })
    return
  }
  
  db.run(
    'UPDATE birthdays SET name = ?, email = ?, birthDate = ?, phone = ? WHERE id = ?',
    [name, email, birthDate, phone || null, id],
    function(err) {
      if (err) {
        console.error('Error updating birthday:', err)
        res.status(500).json({ error: 'Failed to update birthday' })
        return
      }
      
      if (this.changes === 0) {
        res.status(404).json({ error: 'Birthday not found' })
        return
      }
      
      res.json({ message: 'Birthday updated successfully' })
    }
  )
})

app.delete('/api/birthdays/:id', (req, res) => {
  const { id } = req.params
  
  db.run('DELETE FROM birthdays WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting birthday:', err)
      res.status(500).json({ error: 'Failed to delete birthday' })
      return
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Birthday not found' })
      return
    }
    
    res.json({ message: 'Birthday deleted successfully' })
  })
})

// Get today's birthdays
app.get('/api/birthdays/today', (req, res) => {
  const today = new Date()
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  db.all(
    `SELECT * FROM birthdays WHERE substr(birthDate, 6) = ?`,
    [todayString],
    (err, rows) => {
      if (err) {
        console.error('Error fetching today\'s birthdays:', err)
        res.status(500).json({ error: 'Failed to fetch today\'s birthdays' })
        return
      }
      res.json(rows)
    }
  )
})

// Cron job to check for birthdays daily at 9 AM
cron.schedule('0 9 * * *', () => {
  console.log('Checking for today\'s birthdays...')
  
  const today = new Date()
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  db.all(
    `SELECT * FROM birthdays WHERE substr(birthDate, 6) = ?`,
    [todayString],
    (err, rows) => {
      if (err) {
        console.error('Error checking birthdays:', err)
        return
      }
      
      if (rows.length > 0) {
        console.log(`Found ${rows.length} birthday(s) today:`)
        rows.forEach(birthday => {
          console.log(`- ${birthday.name} (${birthday.email})`)
        })
        
        // Here you could add email notifications, push notifications, etc.
      } else {
        console.log('No birthdays today.')
      }
    }
  )
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Birthday API is running' })
})

app.listen(PORT, () => {
  console.log(`🎉 Birthday API server running on port ${PORT}`)
  console.log(`📊 Database: ${join(__dirname, 'birthdays.db')}`)
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`)
})