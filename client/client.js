const publicVapidKey = "BCEJnPIKMtCPefKgrRzy5eStQyxpCKfU-aw2MmlYBZojG-pKUrDHoNkRuWWW1jZ55zBFJL5ifxBi7tWxlLKtZQE";

// check for service workers
if('serviceWorker' in navigator){
    send().catch(err => {
        console.error(err);
    })
}


// Register Service Worker
// Register Push 
// send push

async function send(){
    console.log("Registering Service Worker");
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });
    console.log("Service Worker registered");

    // Register Push 
    console.log("Registering Push ...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });
    console.log("Push Registered...");

    console.log("Sending Push...");
    await fetch("/subscribe",{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': "application/json"
        }
    });

}