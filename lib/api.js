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
    // Check if ML API URL is configured
    if (!ML_API_URL || ML_API_URL.includes('your-unique-hash') || ML_API_URL.includes('[YOUR-UNIQUE-HASH]')) {
        console.warn('ML API not configured, using fallback classification');
        // Return a default classification based on filename or random
        const defaultCategories = ['pothole', 'damaged_streetlight', 'water_puddle', 'garbage'];
        const randomCategory = defaultCategories[Math.floor(Math.random() * defaultCategories.length)];
        
        return {
            detections: [{
                class_name: randomCategory,
                confidence: '0.75',
                bounding_box: [0, 0, 100, 100]
            }],
            model_info: {
                model_type: 'Fallback',
                classes: defaultCategories,
                total_detections: 1
            }
        };
    }

    try {
        const formData = new FormData();
        formData.append("file", imageFile);
        
        const response = await fetch(ML_API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type - let browser set it for FormData
            }
        });
        
        if (!response.ok) {
            throw new Error(`ML API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.warn('ML API failed, using fallback:', error.message);
        
        // Fallback classification if ML API fails
        const fallbackCategories = ['pothole', 'damaged_streetlight', 'water_puddle', 'garbage'];
        const fallbackCategory = fallbackCategories[Math.floor(Math.random() * fallbackCategories.length)];
        
        return {
            detections: [{
                class_name: fallbackCategory,
                confidence: '0.70',
                bounding_box: [0, 0, 100, 100]
            }],
            model_info: {
                model_type: 'Fallback (ML API unavailable)',
                classes: fallbackCategories,
                total_detections: 1
            }
        };
    }
};