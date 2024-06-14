//Functions useful in multiple pages
// will add the route http.../user/register
// data - {"username": "Lena", "password": "123"}
//methodType - "POST", "PUT", "DELETE"

export async function fetchData(route = '', data = {}, methodType) {
    //TEST
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    console.log(`URL: http://localhost:4000${route}`);
    console.log('Data:', data);
    console.log('Method:', methodType);
    //sending over our data to specified route in server
    const response = await fetch(`http://localhost:4000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    });

    //dealing with our response from server

    if (response.ok) {
        return await response.json(); //If it's okay
    } else {
        throw await response.json(); //If not, throw error 
    }
}