// Firebase messaging readiness snippet (replace config with your project values)
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

export async function requestPermissionAndGetToken(messaging) {
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      // messaging.getToken() usage depends on firebase v9+ setup
      return true
    }
  } catch (err) {
    console.error('Permission error', err)
  }
  return false
}
