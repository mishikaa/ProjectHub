// src/services/projectService.js

const API_URL = 'http://localhost:3000/projects';

export const getProjects = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
//     console.log(response)
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
};

export const getProject = async (id) => {
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
