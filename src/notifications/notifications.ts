import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const TOAST_POSITION = "top-right"

// Logout
export const logoutErrorNotification = (error) => {
    toast.error(`Logout Error: ${error}`, {
        position: TOAST_POSITION
    });
}

export const logoutSuccessNotification = (user) => {
    toast.success(`Trainer ${user} has been logged out`, {
        position: TOAST_POSITION
    });
}

// Login
export const loginErrorNotification = (error) => {
    toast.error(`Logout Error: ${error}`, {
        position: TOAST_POSITION
    });
}

export const loginSuccessNotification = (user) => {
    toast.success(`Trainer ${user} logged in!`, {
        position: TOAST_POSITION
    });
}

// Registered 
export const registrationErrorNotification = (error) => {
    toast.error(`Registration Error: ${error}`, {
        position: TOAST_POSITION
    });
}

export const registrationSuccessNotification = (user) => {
    toast.success(`Trainer ${user} registered successfully!`, {
        position: TOAST_POSITION
    });
}
// Added/Removed

export const addPokemonSuccessNotification = (pokemon) => {
    toast.success(`Trainer added ${pokemon} to team successfully!`, {
        position: TOAST_POSITION
    });
}

export const addPokemonErrorNotification = (error) => {
    toast.error(`Error adding pokemon: ${error}`, {
        position: TOAST_POSITION
    });
}

export const removePokemonSucessNotification = (pokemon) => {
    toast.success(`Trainer removed ${pokemon} from team successfully!`, {
        position: TOAST_POSITION
    });
}

export const removePokemonErrorNotification = (error) => {
    toast.error(`Error removing pokemon: ${error}`, {
        position: TOAST_POSITION
    });
}