import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient()
  ],
};
const BASE_URL = 'https://localhost:7109';

export const API_URLS = {
    URL: BASE_URL,
    LOGIN_API: `${BASE_URL}/api/Auth/login`,
    USER_API: `${BASE_URL}/api/User`,
    PRODUCT_API: `${BASE_URL}/api/Product`,
    PURCHASE_API: `${BASE_URL}/api/Purchase`,
    CONTRIBUTION_API: `${BASE_URL}/api/Contribution`,
};