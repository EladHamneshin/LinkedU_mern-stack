import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { toast } from "react-toastify";

const handleResError = (error: FetchBaseQueryError) => {
    if (error.data) {
        const data = error.data as { message: string };
        toast.error(data.message);
    }
    else if(error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR' || error.status === 'CUSTOM_ERROR') {
        toast.error(error.error);
    }
    else{
        toast.error("Something went wrong");
    }
}

export { handleResError}