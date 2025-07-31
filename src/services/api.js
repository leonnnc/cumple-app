const API_BASE = '/api'

export const getBirthdays = async () => {
  try {
    const response = await fetch(`${API_BASE}/birthdays`)
    if (!response.ok) throw new Error('Failed to fetch birthdays')
    return await response.json()
  } catch (error) {
    console.error('Error fetching birthdays:', error)
    return []
  }
}

export const addBirthday = async (birthdayData) => {
  try {
    const response = await fetch(`${API_BASE}/birthdays`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(birthdayData)
    })
    
    if (!response.ok) throw new Error('Failed to add birthday')
    return await response.json()
  } catch (error) {
    console.error('Error adding birthday:', error)
    throw error
  }
}

export const deleteBirthday = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/birthdays/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) throw new Error('Failed to delete birthday')
    return await response.json()
  } catch (error) {
    console.error('Error deleting birthday:', error)
    throw error
  }
}

export const updateBirthday = async (id, birthdayData) => {
  try {
    const response = await fetch(`${API_BASE}/birthdays/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(birthdayData)
    })
    
    if (!response.ok) throw new Error('Failed to update birthday')
    return await response.json()
  } catch (error) {
    console.error('Error updating birthday:', error)
    throw error
  }
}