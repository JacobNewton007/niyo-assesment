// client-side code
import io from 'socket.io-client';
const socket = io('ws://localhost:9090/v1');
// Assuming WebSocket server runs on port 3000

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('events', (data) => {

  // Handle incoming events
  console.log('Received data from server::::::::::', data);
});


