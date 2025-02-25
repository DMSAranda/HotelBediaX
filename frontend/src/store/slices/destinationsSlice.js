import { createSlice } from "@reduxjs/toolkit";

export const initialDestinationForm = {
    id: 0,
    name: '',
    description: '',
    countryCode: '',
    type: '',
    lastModif: ''
}

const initialErrors = {
    name: '',
    description: '',
    countryCode: '',
    type: ''
}

export const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: {
        destinations: [],
        paginator: {},
        destinationSelected: initialDestinationForm,
        visibleForm: false,
        errors: initialErrors,
        isLoading: true
    },
    reducers: {
        addDestination: (state, action) => {
            state.destinations = [
                ...state.destinations,
                {
                    ...action.payload
                }
            ];
            state.destinationSelected = initialDestinationForm;
            state.visibleForm = false;
        },
        removeDestination: (state, action) => {
            state.destinations = state.destinations.filter(destination => destination.id !== action.payload)
        },
        updateDestination: (state, action) => {
            state.destinations = state.destinations.map(destination => {
                if (destination.id === action.payload.id) {
                    return {
                        ...action.payload,
                    }
                }
                return destination;
            })
            state.destinationSelected = initialDestinationForm;
            state.visibleForm = false;
        },
        loadingDestinations: (state, action) => {
            state.destinations = action.payload.content;
            state.paginator = action.payload;
            state.isLoading = false;
        },
        onDestinationSelected: (state, action) => {
            state.destinationSelected = action.payload;
            state.visibleForm = true;
        },
        onOpenForm: (state) => {
            state.visibleForm = true;
        },
        onCloseForm: (state) => {
            state.visibleForm = false;
            state.destinationSelected = initialDestinationForm;
            state.errors = {};
        },
        onError: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export const {
    addDestination,
    removeDestination,
    updateDestination,
    loadingDestinations,
    onDestinationSelected,
    onOpenForm,
    onCloseForm,
    onError
} = destinationsSlice.actions

export const getDestination = (state) => state.destinations;