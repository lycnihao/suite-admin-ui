import { homeRouters } from './modules/home';
import { loginRouters } from './modules/login';

export const routerArray = [...homeRouters, ...loginRouters];