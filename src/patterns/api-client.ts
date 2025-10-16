/**
 * API Client Pattern
 * 
 * A reusable pattern for making API calls with proper error handling,
 * loading states, and TypeScript support.
 */

// Generic API response type
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

// Generic fetch wrapper with error handling
export async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    // Return error in a consistent format
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

// Example usage in a React component:
/*
import { useState, useEffect } from 'react';
import { apiClient } from '@/patterns/api-client';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await apiClient<User[]>('/api/users');
      
      if (error) {
        setError(error);
      } else if (data) {
        setUsers(data);
      }
      
      setLoading(false);
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
*/

// POST request example
export async function postData<T>(url: string, body: any) {
  return apiClient<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// PUT request example
export async function updateData<T>(url: string, body: any) {
  return apiClient<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

// DELETE request example
export async function deleteData(url: string) {
  return apiClient(url, {
    method: 'DELETE',
  });
}