import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  // Add other reducers here
});

// Persistence configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'onboarding'], // Persist auth and onboarding state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Typescript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 