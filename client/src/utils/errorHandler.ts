import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { toast } from "react-toastify";

const handleResError = (error: FetchBaseQueryError) => {
    if (error.data) {
        const data = error.data as { message: string };
        toast.error(data.message);
    }

    if(error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR' || error.status === 'CUSTOM_ERROR') {
    toast.error(error.error);
    }
}

export { handleResError}