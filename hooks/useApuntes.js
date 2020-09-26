import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useApuntes = order => {

    const [ apuntes, setApunte ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getApuntes = () => {
            firebase.db.collection('apuntes').orderBy(order, 'desc').onSnapshot(manejarSnapshot)
        }
        getApuntes();
    }, []);

    function manejarSnapshot(snapshot) {
        const apuntes = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });

        setApunte(apuntes);
    }

    return {
        apuntes
    }
}

export default useApuntes;