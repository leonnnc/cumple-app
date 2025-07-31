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

// Utility functions
function formatDateForPassword(birthDate) {
  // Convert YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = birthDate.split('-')
  return `${day}/${month}/${year}`
}

function validatePassword(inputPassword, storedPassword) {
  return inputPassword === storedPassword
}

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
      isAdmin INTEGER DEFAULT 0,
      canEdit INTEGER DEFAULT 1,
      password TEXT,
      photo TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  // Create default admin if not exists
  db.get('SELECT COUNT(*) as count FROM birthdays WHERE isAdmin = 1', (err, row) => {
    if (err) {
      console.error('Error checking admin:', err)
      return
    }
    
    if (row.count === 0) {
      // Create default admin
      db.run(
        'INSERT INTO birthdays (name, email, birthDate, phone, isAdmin, password) VALUES (?, ?, ?, ?, ?, ?)',
        ['Leonnnc', 'Leonnnc', '2000-01-01', null, 1, 'appcumple25'],
        function(err) {
          if (err) {
            console.error('Error creating default admin:', err)
          } else {
            console.log('✅ Default admin created: Leonnnc')
          }
        }
      )
    }
  })
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
  const { name, email, birthDate, phone, isAdmin, photo } = req.body
  
  if (!name || !email || !birthDate) {
    res.status(400).json({ error: 'Name, email, and birthDate are required' })
    return
  }
  
  // Check if trying to create admin when one already exists
  if (isAdmin) {
    db.get('SELECT COUNT(*) as count FROM birthdays WHERE isAdmin = 1', (err, row) => {
      if (err) {
        console.error('Error checking admin:', err)
        res.status(500).json({ error: 'Failed to check admin status' })
        return
      }
      
      if (row.count > 0) {
        res.status(400).json({ error: 'Admin already exists' })
        return
      }
      
      // Proceed with admin creation
      insertBirthday()
    })
  } else {
    insertBirthday()
  }
  
  function insertBirthday() {
    // Generate default password from birthDate (dd/mm/yyyy format)
    const defaultPassword = isAdmin ? formatDateForPassword(birthDate) : null
    
    db.run(
      'INSERT INTO birthdays (name, email, birthDate, phone, isAdmin, password, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, birthDate, phone || null, isAdmin ? 1 : 0, defaultPassword, photo || null],
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
          isAdmin: isAdmin || false,
          photo,
          message: 'Birthday added successfully'
        })
      }
    )
  }
})

app.put('/api/birthdays/:id', (req, res) => {
  const { id } = req.params
  const { name, email, birthDate, phone, isAdmin, photo } = req.body
  
  if (!name || !email || !birthDate) {
    res.status(400).json({ error: 'Name, email, and birthDate are required' })
    return
  }
  
  db.run(
    'UPDATE birthdays SET name = ?, email = ?, birthDate = ?, phone = ?, isAdmin = ?, canEdit = 0, photo = ? WHERE id = ?',
    [name, email, birthDate, phone || null, isAdmin ? 1 : 0, photo || null, id],
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

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' })
    return
  }
  
  db.get(
    'SELECT * FROM birthdays WHERE (email = ? OR name = ?) AND isAdmin = 1',
    [email, email],
    (err, row) => {
      if (err) {
        console.error('Error during login:', err)
        res.status(500).json({ error: 'Login failed' })
        return
      }
      
      if (!row) {
        res.status(401).json({ error: 'Usuario no encontrado o no es administrador' })
        return
      }
      
      if (!validatePassword(password, row.password)) {
        res.status(401).json({ error: 'Contraseña incorrecta' })
        return
      }
      
      // Return user data without password
      const { password: _, ...userData } = row
      res.json({
        message: 'Login successful',
        user: {
          ...userData,
          isAdmin: Boolean(userData.isAdmin)
        }
      })
    }
  )
})

app.post('/api/auth/change-password', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body
  
  if (!userId || !currentPassword || !newPassword) {
    res.status(400).json({ error: 'All fields are required' })
    return
  }
  
  // First verify current password
  db.get(
    'SELECT password FROM birthdays WHERE id = ? AND isAdmin = 1',
    [userId],
    (err, row) => {
      if (err) {
        console.error('Error verifying password:', err)
        res.status(500).json({ error: 'Failed to verify password' })
        return
      }
      
      if (!row) {
        res.status(404).json({ error: 'User not found or not admin' })
        return
      }
      
      if (!validatePassword(currentPassword, row.password)) {
        res.status(401).json({ error: 'Contraseña actual incorrecta' })
        return
      }
      
      // Update password
      db.run(
        'UPDATE birthdays SET password = ? WHERE id = ?',
        [newPassword, userId],
        function(err) {
          if (err) {
            console.error('Error updating password:', err)
            res.status(500).json({ error: 'Failed to update password' })
            return
          }
          
          res.json({ message: 'Password updated successfully' })
        }
      )
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