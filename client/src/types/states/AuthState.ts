import Mode from '../Mode.js';
import UserInfo from '../UserInfo.js';

type AuthState = {
    userInfo: UserInfo | null,
    mode: Mode
}

export default AuthState;