import { ref, onDisconnect, set } from 'firebase/database'
import { realtime } from '@/libs/firebase';

export function verifyUsersStatus(uid: string, idle?: string) {
    const isOfflineForDatabase = {
        state: 'Offline'
    };
    
    const isOnlineForDatabase = {
        state: 'Online'
    };

    const isIdleForDatabase = {
        state: 'Ausente'
    };

    if(idle) {
        set(ref(realtime, '/status/' + uid), isIdleForDatabase)
        return;
    }

    set(ref(realtime, '/status/' + uid), isOnlineForDatabase)
    onDisconnect(ref(realtime, '/status/' + uid)).set(isOfflineForDatabase)
}

export function createCompanyUsageSize(id_company: string) {
    set(ref(realtime, '/usage/' + id_company), {
        size: 0
    })
}