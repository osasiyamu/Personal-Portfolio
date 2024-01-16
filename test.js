const os = require('os');

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Iterate over interfaces to find the IPv4 address
Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaceDetails = networkInterfaces[interfaceName];

    interfaceDetails.forEach((address) => {
        if (address.family === 'IPv4' && !address.internal) {
            console.log(`Node.js application is running on IP address: ${address.address}`);
        }
    });
});