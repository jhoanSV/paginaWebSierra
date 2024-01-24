import { configureStore } from '@reduxjs/toolkit';
//reducers
import logged from './slices/logged';

//*this is the configuration of every global states
export default configureStore({
    reducer: {//*this is conformed by several reducers
        logged
    }
});