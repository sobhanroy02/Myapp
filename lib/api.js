// CODE FOR: lib/api.js

import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ML_API_URL = process.env.NEXT_PUBLIC_ML_API_URL;

const getAuthToken = async () => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No user is authenticated. Please log in.");
    }
    return await user.getIdToken();
};

export const getIssues = async () => {
    const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch issues.');
    return response.json();
};

export const createIssue = async (issueData) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const token = await user.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(issueData)
    });
    
    if (!response.ok) throw new Error('Failed to create issue.');
    return response.json();
};

export const analyzeImageWithAI = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    
    const response = await fetch(ML_API_URL, {
        method: 'POST',
        body: formData,
    });
    
    if (!response.ok) {
        throw new Error('Failed to analyze image.');
    }
    return response.json();
};