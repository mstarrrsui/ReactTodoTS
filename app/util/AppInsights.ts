import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: 'd36afb1c-d143-4cae-80e4-e89627792d4d',
    enableAutoRouteTracking: true
    /* ...Other Configuration Options... */
  }
});

export default appInsights;
