import { createSlice } from '@reduxjs/toolkit';

//*here are the global states
export const loggedSlice = createSlice({
    name: 'logged',
    initialState: {
        isLogged: false
    },
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        }
    }
});

export const { setIsLogged } = loggedSlice.actions;

export default loggedSlice.reducer;