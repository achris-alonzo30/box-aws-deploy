import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialStateProps = {
    isSidebarCollapsed: boolean;
}

const initialState: InitialStateProps = {
    isSidebarCollapsed: false,
}

// reducers.state takes in the keys of the initial state
// reducers.actions takes in the upcoming values received from the reducer
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        }
    }
});

export const { setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer