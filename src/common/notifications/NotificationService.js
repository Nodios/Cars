import {toast} from 'react-toastify';

class NotificationService {
    success(message) {
        toast.success(message)
    }

    error(message) {
        toast.error(message);
    }
}

export default NotificationService;