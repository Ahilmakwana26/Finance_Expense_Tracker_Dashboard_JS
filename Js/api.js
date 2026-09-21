const API_URL = 'http://192.168.31.81:8000/api';


export const getTransactionData = async () => {
    try {
        let response = await fetch(`${API_URL}/transaction`);
        
        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
       }
        let data = await response.json();


        if (data) {
            return data.data.data;
        }

    } catch (error) {
        console.log('something wrong ,error is', error)
        return error;
    }
}

export const add = async (data) => {
     await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content_type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`http Error ! ${response.status}`)
        }
        return response.json();
    }).then(data => {
        return ['sucess',data];
    }).catch(error => {
        console.error('something wrong during add transaction',error);
    })

}

export const edit = async (data) => {
  await fetch(`${API_URL}/edit`,{
    method:'POST',
    headers:{
        'Content_type':'application/json',
    },
    body:JSON.stringify(data)
  }).then(response =>{
    if(!response.ok){
         throw new Error(`http Error ! ${response.status}`);
    }
    return response.json();
  }).then(data => {
    return ['sucess',data];
  }).catch(error =>{
     console.error('something wrong during edit transaction',error);
  })
}