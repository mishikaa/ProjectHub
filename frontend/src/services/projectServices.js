import axios from "axios";

const API_URL = 'http://localhost:3000/projects';
const TASKS_API_URL = 'http://localhost:3000/tasks'; // Assuming tasks endpoint

// Project Services
export const getProjects = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project', error);
    throw error;
  }
};

export const createProject = async (project) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating project', error);
    throw error;
  }
};

export const updateProject = async (id, project) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating project', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting project', error);
    throw error;
  }
};

// Task Services
export const getTasks = async (projectId) => {
  try {
    const response = await fetch(`${TASKS_API_URL}?projectId=${projectId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(TASKS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating task', error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${TASKS_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating task', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${TASKS_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting task', error);
    throw error;
  }
};

export const uploadFile = async (projectId, formData) => {
  const response = await axios.post(`${API_URL}/${projectId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

// Function to delete a file from a project
export const deleteFile = async (projectId, fileUrl) => {
  try {
    const response = await axios.delete(`${API_URL}/${projectId}/files`, {
      data: { fileUrl }, // Send fileUrl as data in the request body
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting file', error);
    throw error;
  }
};