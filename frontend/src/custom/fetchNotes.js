const fetchNotes = async(token) => {
    try {
        const res = await fetch('http://localhost:5000/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status !== 200) return false;
        return data;

    } catch (error) {
        return false;
    }
}

export default fetchNotes;