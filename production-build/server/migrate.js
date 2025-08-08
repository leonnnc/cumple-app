import sqlite3 from 'sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const db = new sqlite3.Database(join(__dirname, 'birthdays.db'))

console.log('🔄 Migrating database...')

db.serialize(() => {
  // Add missing columns
  db.run('ALTER TABLE birthdays ADD COLUMN isAdmin INTEGER DEFAULT 0', (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding isAdmin:', err)
    } else {
      console.log('✅ isAdmin column ready')
    }
  })
  
  db.run('ALTER TABLE birthdays ADD COLUMN canEdit INTEGER DEFAULT 1', (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding canEdit:', err)
    } else {
      console.log('✅ canEdit column ready')
    }
  })
  
  db.run('ALTER TABLE birthdays ADD COLUMN password TEXT', (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding password:', err)
    } else {
      console.log('✅ password column ready')
    }
  })
  
  db.run('ALTER TABLE birthdays ADD COLUMN photo TEXT', (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding photo:', err)
    } else {
      console.log('✅ photo column ready')
    }
    
    // Create default admin after all columns are added
    setTimeout(() => {
      db.get('SELECT COUNT(*) as count FROM birthdays WHERE isAdmin = 1', (err, row) => {
        if (err) {
          console.error('Error checking admin:', err)
          db.close()
          return
        }
        
        if (row.count === 0) {
          db.run(
            'INSERT INTO birthdays (name, email, birthDate, phone, isAdmin, password) VALUES (?, ?, ?, ?, ?, ?)',
            ['Leonnnc', 'Leonnnc', '2000-01-01', null, 1, 'appcumple25'],
            function(err) {
              if (err) {
                console.error('❌ Error creating default admin:', err)
              } else {
                console.log('✅ Default admin created: Leonnnc / appcumple25')
              }
              db.close()
            }
          )
        } else {
          console.log('ℹ️  Admin already exists')
          db.close()
        }
      })
    }, 200)
  })
})